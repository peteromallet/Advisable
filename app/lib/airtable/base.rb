# frozen_string_literal: true

# Classes that inherit from Airtable::Base are used to sync a table from aitable
# to a local database table. The Airtable::Base class is backed by the airrecord
# gem. This means that each subclass of Airtable::Base must define its
# table_name.
# see app/models/concerns/airtable/application.rb for a detailed example class.
# Each ActiveRecord model that is synced with an airtable database table is
# expected to have an airtable_id column.
module Airtable
  class Base < Airrecord::Table
    class << self
      attr_accessor :sync_model, :sync_block, :push_block, :after_sync_block

      def base_key
        ENV.fetch("AIRTABLE_DATABASE_KEY", nil)
      end

      def sync_with(model)
        @sync_model = model
      end

      def push_data(&block)
        @push_block = block
      end
    end

    def model
      @model ||= self.class.sync_model.find_or_initialize_by(airtable_id: id)
    end

    def push(record, additional_fields = {})
      raise "Airtable ID does not match" if id && id != record.try(:airtable_id)

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
          raise e if retry_count > retry_limit || !handle_airtable_error(e, record)

          retry
        end
      end
    end

    # By default the handle_airtable_error method simply return false. The
    # handle_airatble_error method can be overridden inside of Airtable classes
    # to handle errors. If the handle_airtable_error method returns true it will
    # retry to sync the record.
    def handle_airtable_error(_err, _record)
      false
    end
  end
end
