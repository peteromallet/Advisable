# frozen_string_literal: true

class RemoveOriginalIdFromSkills < ActiveRecord::Migration[6.1]
  def change
    safety_assured do
      remove_column :skills, :original_id, :bigint
    end
  end
end
