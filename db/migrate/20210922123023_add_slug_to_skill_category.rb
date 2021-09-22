# frozen_string_literal: true

class AddSlugToSkillCategory < ActiveRecord::Migration[6.1]
  def change
    safety_assured do
      add_column :skill_categories, :slug, :string, null: false # rubocop:disable Rails/NotNullColumn
      add_index :skill_categories, :slug, unique: true
    end
  end
end
