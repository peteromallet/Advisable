# frozen_string_literal: true

module Airtable
  module Syncable
    extend ActiveSupport::Concern
    include Searchable

    class_methods do
      attr_reader :airtable

      def airtable_class(klass)
        @airtable = klass
      end
    end

    # Adds functionality to push a record to airtable. This should be included
    # as a concern for models that sync with airtable
    included do
      before_destroy :remove_from_airtable

      # Updates or creates an airtable record for the instance
      def sync_to_airtable(additional_fields = {})
        airtable_record = airtable_id.present? ? airtable_class.find(airtable_id) : airtable_class.new({})
        airtable_record.push(self, additional_fields)
      end

      # Meant to be used as a drop in replacement for sync_to_airtable
      # but it'll schedule a job that'll perform in background
      def bg_sync_to_airtable(additional_fields = {})
        AirtableSyncJob.perform_later(self, additional_fields)
      end

      def remove_from_airtable
        return if airtable_id.blank?

        airtable_class.find(airtable_id).destroy
      rescue Airrecord::Error => e
        raise e unless e.message.include?("MODEL_ID_NOT_FOUND")
      end

      def sync_from_airtable
        airtable_class.find(airtable_id).sync
      end

      def save_and_sync!
        save!
        bg_sync_to_airtable
      end

      def save_and_sync_with_responsible!(responsible_id)
        Logidze.with_responsible(responsible_id) { save! }
        bg_sync_to_airtable
      end

      private

      def airtable_class
        @airtable_class = self.class.airtable || "Airtable::#{self.class}".constantize
      end
    end
  end
end
