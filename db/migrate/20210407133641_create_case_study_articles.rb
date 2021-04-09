# frozen_string_literal: true

class CreateCaseStudyArticles < ActiveRecord::Migration[6.1]
  def change
    create_table :case_study_articles, id: :uuid do |t|
      t.integer :score
      t.boolean :confidential
      t.string :title
      t.string :subtitle
      t.string :comment
      t.string :excerpt
      t.string :company_type
      t.jsonb :goals
      t.datetime :published_at
      t.datetime :specialist_approved_at
      t.references :specialist, null: false, foreign_key: true
      t.references :interviewer, null: false, foreign_key: {to_table: :accounts}
      t.references :editor, null: false, foreign_key: {to_table: :accounts}

      t.timestamps
    end
  end
end
