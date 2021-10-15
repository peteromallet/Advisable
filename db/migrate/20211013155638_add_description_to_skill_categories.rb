# frozen_string_literal: true

class AddDescriptionToSkillCategories < ActiveRecord::Migration[6.1]
  def change
    add_column :skill_categories, :description, :string
  end
end
