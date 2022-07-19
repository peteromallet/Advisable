# frozen_string_literal: true

class CreateCaseStudyInsights < ActiveRecord::Migration[7.0]
  def change
    create_table :case_study_insights do |t|
      t.string :uid, null: false
      t.references :article, null: false, foreign_key: {to_table: :case_study_articles}
      t.string :title
      t.text :description

      t.timestamps

      t.index :uid, unique: true
    end
  end
end
