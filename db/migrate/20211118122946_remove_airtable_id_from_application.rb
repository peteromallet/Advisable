# frozen_string_literal: true

class RemoveAirtableIdFromApplication < ActiveRecord::Migration[6.1]
  def change
    safety_assured do
      remove_column :applications, :airtable_id, :string
    end
  end
end
