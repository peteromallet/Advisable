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
      ENV["AIRTABLE_DATABASE_KEY"]
    end

    def columns_hash
      @columns_hash || {}
    end
    
    def associations
      @associations ||= {}
    end

    # Sync can be called on any class that inherits from Airtable::Base
    # to sync all records from airtable.
    # We filter the query to only fetch records that have been modified within
    # the last day.
    def sync(report = nil)
      records = all(filter: "DATETIME_DIFF(TODAY(), LAST_MODIFIED_TIME(), 'days') < 1")
      records.each { |r| r.sync(report) }
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

  # You can call sync on an instance of any class that inherits from
  # Airtable::Base to sync that individual record.
  # You can pass an instance of Airtable::SyncReport to capture any
  # errors that prevented the record from being synced
  # => Airtable::Project.find("rec_123").sync
  def sync(report = nil)
    ActiveRecord::Base.transaction do
      record_type = self.class.sync_model.to_s.underscore

      self.class.columns_hash.each do |column, attr|
        model.send("#{attr}=", self[column])
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
      else
        message = "Failed to sync #{record_type} #{id} \n#{model.errors.full_messages}"
        Rails.logger.warn(message)
        report.failed(id, record_type, model.errors.full_messages) if report
      end

      model
    end
  end

  # The push method describes how data should be pushed to airtable. This is
  # not the only place where data is pushed to airtable, we also push data
  # in graphql mutations and service classes.
  def push(record, additional_fields={})
    if id && id != record.try(:airtable_id)
      raise "Airtable ID does not match"
    end

    ActiveRecord::Base.transaction do
      instance_exec(record, &self.class.push_block) if self.class.push_block

      additional_fields.each do |field, value|
        self[field] = value
      end

      if id.present?
        save
      else
        create
      end

      if record.airtable_id.blank?
        record.update_attributes(airtable_id: id)
      end
    end
  end

  # returns the active record model to sync data to
  def model
    @model ||= self.class.sync_model.find_or_initialize_by(airtable_id: id)
  end

  private

  def sync_association(column:,record:,attribute:)
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
    record.send("#{attribute}=", associate)
  end
end
