# frozen_string_literal: true

class CreateCaseStudySharedArticles < ActiveRecord::Migration[6.1]
  def change
    create_table :case_study_shared_articles do |t|
      t.references :article, null: false, foreign_key: {to_table: :case_study_articles}
      t.references :shared_with, null: false, foreign_key: {to_table: :users}
      t.references :shared_by, null: false, foreign_key: {to_table: :users}
      t.text :message
      t.datetime :archived_at

      t.timestamps
    end
  end
end
