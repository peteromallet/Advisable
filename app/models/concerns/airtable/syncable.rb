module Airtable::Syncable
  extend ActiveSupport::Concern

  class_methods do
    attr_reader :airtable

    def airtable_class(klass)
      @airtable = klass
    end

    def find_by_uid_or_airtable_id(id)
      record = find_by_uid(id)
      record = find_by_airtable_id(id) if record.nil?
      record
    end

    def find_by_uid_or_airtable_id!(id)
      record = find_by_uid(id)
      record = find_by_airtable_id!(id) if record.nil?
      record
    end
  end

  # Adds functionality to push a record to airtable. This should be included
  # as a concern for models that sync with airtable
  included do
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

    def save_and_sync!
      save!
      sync_to_airtable
    end
  end
end
