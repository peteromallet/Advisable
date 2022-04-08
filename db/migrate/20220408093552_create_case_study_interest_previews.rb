# frozen_string_literal: true

class CreateCaseStudyInterestPreviews < ActiveRecord::Migration[7.0]
  def change
    create_table :case_study_interest_previews do |t|
      t.references :account, null: false, foreign_key: true
      t.citext :term
      t.jsonb :term_data
      t.string :uid, null: false
      t.jsonb :results

      t.index :uid, unique: true
      t.index %w[term account_id], unique: true

      t.timestamps
    end
  end
end
