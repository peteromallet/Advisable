# frozen_string_literal: true

class CreateSkillCategorySkill < ActiveRecord::Migration[6.1]
  def change
    create_table :skill_category_skills do |t|
      t.references :skill, null: false, foreign_key: true
      t.references :skill_category, null: false, foreign_key: true

      t.timestamps
    end
  end
end
