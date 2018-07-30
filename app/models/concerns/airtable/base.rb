# Classes that inherit from Airtable::Base are used to sync a table from aitable
# to a local database table. The Airtable::Base class is backed by the airrecord
# gem. This means that each subclass of Airtable::Base must define its
# table_name.
# see app/models/concerns/airtable/application.rb for a detailed example class.
# Each ActiveRecord model that is synced with an airtable database table is
# expected to have an airtable_id column.
class Airtable::Base < Airrecord::Table
  class << self
    attr_accessor :sync_model, :sync_block

    def base_key
      ENV["AIRTABLE_DATABASE_KEY"]
    end

    def columns_hash
      @columns_hash || {}
    end

    # Sync can be called on any class that inherits from Airtable::Base
    # to sync all records from airtable
    def sync
      records = all
      Rails.logger.info "Syncing #{sync_model.to_s.underscore.pluralize} (#{records.length})"
      records.each(&:sync)
    end

    # The sync_with method tells the class which ActiveRecord model to sync
    # the data to.
    def sync_with(model)
      @sync_model = model
    end

    # sync_columns provides a direct mapping from the airtable record to the
    # active record model. e.g if the airtable table has a 'name' and 'number'
    # column and the ActiveRecord model has name and number attributes then we
    # can sync these attributes with.
    # => sync_columns :name, :number
    def sync_columns(*attrs)
      attrs.map(&:to_s).each do |attr|
        sync_column(attr, to: attr)
      end
    end

    # sync_column allows us to define a mapping from the airtable record to
    # the ActiveRecord model. e.g if the airtable record has an application_status
    # which we want to sync with the ActiveRecord model's 'status' attribute, we
    # can use.
    # => sync_column :application_status, to: :status
    def sync_column(column, options = {})
      @columns_hash ||= {}
      @columns_hash[column] = options[:to]
    end

    # sync_data allows us to sync data which might not fit into a direct mapping
    # with the airtable record. This can also be useful for setting relationships.
    # See how app/models/concerns/airtable/application.rb syncs the 'questions'
    # column for an example.
    def sync_data(&block)
      @sync_block = block
    end
  end

  # You can call sync on an instance of any class that inherits from
  # Airtable::Base to sync that individual record.
  # => Airtable::Project.find("rec_123").sync
  def sync
    ActiveRecord::Base.transaction do
      Rails.logger.info "Syncing #{self.class.sync_model.to_s.underscore} #{id}"

      self.class.columns_hash.each do |column, attr|
        model.send("#{attr}=", self[column.to_sym])
      end

      instance_exec(model, &self.class.sync_block) if self.class.sync_block

      unless model.save
        Rollbar.warning("
          Failed to sync #{self.class.sync_model.to_s.underscore} #{id} \n
          #{model.errors.full_messages}
        ")
      end

      Webhook.process(model)

      model
    end
  end

  # returns the active record model to sync data to
  def model
    @model ||= self.class.sync_model.find_or_initialize_by(airtable_id: id)
  end
end
