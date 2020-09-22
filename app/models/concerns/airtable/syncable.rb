module Airtable::Syncable
  extend ActiveSupport::Concern

  class_methods do
    AIRTABLE_ID_REGEX = /rec(?!_)/.freeze
    attr_reader :airtable

    def airtable_class(klass)
      @airtable = klass
    end

    def find_by_uid_or_airtable_id(id)
      is_airtable_id(id) ? find_by_airtable_id(id) : find_by_uid(id)
    end

    def find_by_uid_or_airtable_id!(id)
      is_airtable_id(id) ? find_by_airtable_id!(id) : find_by_uid!(id)
    end

    private

    def is_airtable_id(id)
      id.to_s.starts_with?(AIRTABLE_ID_REGEX)
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
    def sync_to_airtable(additional_fields = {})
      airtable_class =
        self.class.airtable || "Airtable::#{self.class}".constantize
      airtable_record =
        if airtable_id.present?
          airtable_class.find(airtable_id)
        else
          airtable_class.new({})
        end

      airtable_record.push(self, additional_fields)
    end

    def remove_from_airtable
      airtable_class =
        self.class.airtable || "Airtable::#{self.class}".constantize
      airtable_class.find(airtable_id).destroy
    end

    def sync_from_airtable
      airtable_class =
        self.class.airtable || "Airtable::#{self.class}".constantize
      airtable_record = airtable_class.find(airtable_id)
      airtable_record.sync
    end
  end
end
