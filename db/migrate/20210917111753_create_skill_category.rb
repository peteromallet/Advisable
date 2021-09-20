# frozen_string_literal: true

class CreateSkillCategory < ActiveRecord::Migration[6.1]
  def change
    create_table :skill_categories do |t|
      t.string :name

      t.timestamps
    end
  end
end
