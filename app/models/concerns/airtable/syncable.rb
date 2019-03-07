module Airtable::Syncable
  extend ActiveSupport::Concern

  class_methods do
    attr_reader :airtable

    def airtable_class(klass)
      @airtable = klass
    end
  end

  # Adds functionality to push a record to airtable. This should be included
  # as a concern for models that sync with airtable
  included do
    after_save :sync_to_airtable, if: :sync_changes_to_airtable
    attr_reader :sync_changes_to_airtable

    # sync_changes_to_airtable is a virtual attribute that when set to true
    # will call sync_to_airtable after the record is saved
    def sync_changes_to_airtable
      @sync_changes_to_airtable || false
    end

    def sync_changes_to_airtable=(value)
      cast = ActiveRecord::Type::Boolean.new.cast(value)
      @sync_changes_to_airtable = cast
    end

    # Updates or creates an airtable record for the instance
    def sync_to_airtable
      airtable_class = self.class.airtable || "Airtable::#{self.class}".constantize
      airtable_record = if airtable_id.present?
        airtable_class.find(airtable_id)
      else
        airtable_class.new({})
      end

      airtable_record.push(self)
    end

    def sync_from_airtable
      airtable_class = self.class.airtable || "Airtable::#{self.class}".constantize
      airtable_record = airtable_class.find(airtable_id)
      airtable_record.sync
    end
  end
end