# Classes that inherit from Airtable::Base are used to sync a table from aitable
# to a local database table. The Airtable::Base class is backed by the airrecord
# gem. This means that each subclass of Airtable::Base must define its
# table_name.
# see app/models/concerns/airtable/application.rb for a detailed example class.
# Each ActiveRecord model that is synced with an airtable database table is
# expected to have an airtable_id column.
class Airtable::Base < Airrecord::Table
  class << self
    attr_accessor :sync_model, :sync_block, :push_block, :after_sync_block

    def base_key
      ENV['AIRTABLE_DATABASE_KEY']
    end

    def columns_hash
      @columns_hash || {}
    end

    def associations
      @associations ||= {}
    end

    def column_associations
      @column_associations ||= {}
    end

    # Sync can be called on any class that inherits from Airtable::Base
    # to sync all records from airtable.
    # We filter the query to only fetch records that have been modified within
    # the last day.
    def sync(
      report = nil,
      filter: "DATETIME_DIFF(TODAY(), LAST_MODIFIED_TIME(), 'days') < 1"
    )
      records = all(filter: filter)
      records.each do |r|
        begin
          r.sync(report)
        rescue StandardError => e
          raise $!, "#{e.message} (#{r.class} with id #{r.id})", $!.backtrace
        end
      end
    end

    # The sync_with method tells the class which ActiveRecord model to sync
    # the data to.
    def sync_with(model)
      @sync_model = model
    end

    # sync_column allows us to define a mapping from the airtable record to
    # the ActiveRecord model. e.g if the airtable record has an application_status
    # which we want to sync with the ActiveRecord model's 'status' attribute, we
    # can use.
    # => sync_column 'Application Status', to: :status
    def sync_column(column, options = {})
      @columns_hash ||= {}
      @columns_hash[column] = options[:to]
    end

    # sync_assocation allows us to define a mapping from an airtable column to
    # an associated ActiveRecord model. This should be used when airtable
    # columns are setup to 'Link to another record'.
    # Note: Currently only supports belongs_to relationships
    def sync_association(column, options = {})
      @associations ||= {}
      @associations[column] = options
    end

    # sync_column_to_association allows us to define a mapping from an airtable column
    # to a column on an associated ActiveRecord model.
    # e.g. first_name from Specialist to Account
    def sync_column_to_association(column, association:, to:)
      @column_associations ||= {}
      @column_associations[association] ||= {}
      @column_associations[association][column] = to
    end

    # sync_data allows us to sync data which might not fit into a direct mapping
    # with the airtable record. This can also be useful for setting relationships.
    # See how app/models/concerns/airtable/application.rb syncs the 'questions'
    # column for an example.
    def sync_data(&block)
      @sync_block = block
    end

    def push_data(&block)
      @push_block = block
    end

    def after_sync(&block)
      @after_sync_block = block
    end
  end

  # returns the active record model to sync data to
  def model
    @model ||= self.class.sync_model.find_or_initialize_by(airtable_id: id)
  end

  # You can call sync on an instance of any class that inherits from
  # Airtable::Base to sync that individual record.
  # You can pass an instance of Airtable::SyncReport to capture any
  # errors that prevented the record from being synced
  # => Airtable::Project.find("rec_123").sync
  def sync(report = nil)
    ActiveRecord::Base.transaction do
      record_type = self.class.sync_model.to_s.underscore

      self.class.columns_hash.each do |column, attr|
        model.public_send("#{attr}=", self[column])
      end

      self.class.column_associations.each do |association, columns_hash|
        model.public_send("create_#{association}") if model.public_send(association).blank?
        association = model.public_send(association)
        columns_hash.each do |column, attr|
          association.public_send("#{attr}=", self[column])
        end
        association.save
      end

      self.class.associations.each do |column, options|
        sync_association(column: column, record: model, attribute: options[:to])
      end

      instance_exec(model, &self.class.sync_block) if self.class.sync_block

      if model.save
        Webhook.process(model)
        if self.class.after_sync_block
          instance_exec(model, &self.class.after_sync_block)
        end

        return model
      end

      message =
        "Failed to sync #{record_type} #{id} \n#{model.errors.full_messages}"
      Rails.logger.warn(message)
      report.failed(id, record_type, model.errors.full_messages) if report
      return nil
    end
  end

  # The push method describes how data should be pushed to airtable. This is
  # not the only place where data is pushed to airtable, we also push data
  # in graphql mutations and service classes, however, most of these are being
  # converted to use the sync_to_airtable method from the Syncable module which
  # uses push
  def push(record, additional_fields = {})
    raise 'Airtable ID does not match' if id && id != record.try(:airtable_id)

    ActiveRecord::Base.transaction do
      # we keep track of how many times the push has been retried if any errors
      # are thrown. We limit retries to 5.
      retry_count = 0
      retry_limit = 5

      begin
        retry_count += 1
        instance_exec(record, &self.class.push_block) if self.class.push_block

        additional_fields.each { |field, value| self[field] = value }

        id.present? ? save : create

        record.update(airtable_id: id) if record.airtable_id.blank?

        # When airtable response with an error we call the handle_airtable_error
        # method which can then be used to handle the error before attempting to
        # retry the sync
      rescue Airrecord::Error => e
        if retry_count <= retry_limit && handle_airtable_error(e, record)
          retry
        else
          raise e
        end
      end
    end
  end

  # By default the handle_airtable_error method simply return false. The
  # handle_airatble_error method can be overridden inside of Airtable classes
  # to handle errors. If the handle_airtable_error method returns true it will
  # retry to sync the record.
  def handle_airtable_error(e, record)
    false
  end

  private

  def sync_association(column:, record:, attribute:)
    # read the id from the column data.
    id = self[column].try(:first)
    # if there is no ID then we are done.
    return unless id
    # use rails reflect_on_association metod to find the association class.
    reflection = record.class.reflect_on_association(attribute)
    association_class = reflection.class_name.constantize
    # use the class name to find the association airtable class
    airtable_class = "Airtable::#{reflection.class_name}".constantize
    # see if we have a synced copy of the association first
    associate = association_class.find_by_airtable_id(id)
    # if there isn't a synced version of the association then sync it
    associate = airtable_class.find(id).sync if associate.nil?
    # assign the association
    record.public_send("#{attribute}=", associate)
  end
end
