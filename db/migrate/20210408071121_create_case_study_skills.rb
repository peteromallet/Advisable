# frozen_string_literal: true

class CreateCaseStudySkills < ActiveRecord::Migration[6.1]
  def change
    create_table :case_study_skills do |t|
      t.string :uid, null: false, index: true
      t.boolean :primary
      t.references :article, null: false, foreign_key: {to_table: :case_study_articles}
      t.references :skill, null: false, foreign_key: true

      t.timestamps
    end
  end
end
