module Airtable::Syncable
  extend ActiveSupport::Concern

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
      airtable_record = if airtable_id.present?
        Airtable::Project.find(airtable_id)
      else
        Airtable::Project.new({})
      end

      airtable_record.push(self)
    end
  end
end