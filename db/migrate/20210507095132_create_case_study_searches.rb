# frozen_string_literal: true

class CreateCaseStudySearches < ActiveRecord::Migration[6.1]
  def change
    create_table :case_study_searches do |t|
      t.string :uid, null: false, index: true
      t.string :name
      t.references :user, null: false, foreign_key: true
      t.string :business_type
      t.jsonb :goals
      t.jsonb :saved
      t.jsonb :archived

      t.timestamps
    end
  end
end
