# frozen_string_literal: true

class RemoveAirtableIdFromTask < ActiveRecord::Migration[6.1]
  def change
    safety_assured do
      remove_column :tasks, :airtable_id, :string
    end
  end
end
