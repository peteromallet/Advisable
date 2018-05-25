class Airtable::Base < Airrecord::Table
  class << self
    attr_accessor :sync_model, :sync_block
    attr_reader :columns_hash

    # Sync can be called on any class that inherits from Airtable::Base
    # to sync all records from airtable
    def sync
      records = all
      puts "Syncing #{sync_model.to_s.underscore.pluralize} (#{records.length})"
      records.each(&:sync)
    end

    def sync_with(model)
      @sync_model = model
    end

    def sync_columns(*attrs)
      attrs.map(&:to_s).each do |attr|
        sync_column(attr, to: attr)
      end
    end

    def sync_column(column, options = {})
      @columns_hash ||= {}
      @columns_hash[column] = options[:to]
    end

    def sync_data(&block)
      @sync_block = block
    end
  end

  def sync
    ActiveRecord::Base.transaction do
      puts "Syncing #{self.class.sync_model.to_s.underscore} #{id}"
      record = self.class.sync_model.find_or_initialize_by(airtable_id: id)

      columns = self.class.columns_hash || {}
      columns.each do |column, attr|
        record.send("#{attr}=", self[column.to_sym])
      end

      instance_exec(record, &self.class.sync_block) if self.class.sync_block
      unless record.save
        puts "Failed to sync #{self.class.sync_model.to_s.underscore} #{id}"
        puts record.errors.full_messages
      end
      record
    end
  end
end
