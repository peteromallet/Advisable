# frozen_string_literal: true

class CreateCaseStudyInterests < ActiveRecord::Migration[7.0]
  def change
    create_table :case_study_interests do |t|
      t.string :uid, null: false
      t.references :account, null: false, foreign_key: true
      t.string :term
      t.jsonb :article_ids

      t.index :uid, unique: true

      t.timestamps
    end
  end
end
