# frozen_string_literal: true

class CreateCaseStudyArticles < ActiveRecord::Migration[6.1]
  def change
    create_table :case_study_articles do |t|
      t.string :uid, null: false, index: true
      t.integer :score
      t.boolean :confidential
      t.string :title
      t.string :subtitle
      t.text :comment
      t.text :editor_note
      t.text :freelancer_edits
      t.string :excerpt
      t.string :company_type
      t.jsonb :goals
      t.datetime :published_at
      t.datetime :specialist_approved_at
      t.references :specialist, null: false, foreign_key: true
      t.references :interviewer, foreign_key: {to_table: :accounts}
      t.references :editor, foreign_key: {to_table: :accounts}

      t.timestamps
    end
  end
end
