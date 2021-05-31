# frozen_string_literal: true

class RemoveAirtableIdFromInterview < ActiveRecord::Migration[6.1]
  def change
    safety_assured do
      remove_column :interviews, :airtable_id, :string
    end
  end
end
