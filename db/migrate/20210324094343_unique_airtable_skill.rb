# frozen_string_literal: true

class UniqueAirtableSkill < ActiveRecord::Migration[6.1]
  def change
    safety_assured do
      remove_index :skills, :airtable_id
      add_index :skills, :airtable_id, unique: true
    end
  end
end
