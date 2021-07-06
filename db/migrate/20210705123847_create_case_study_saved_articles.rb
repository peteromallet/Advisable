# frozen_string_literal: true

class CreateCaseStudySavedArticles < ActiveRecord::Migration[6.1]
  def change
    create_table :case_study_saved_articles do |t|
      t.references :user, null: false, foreign_key: true
      t.references :article, null: false, foreign_key: {to_table: :case_study_articles}
      t.references :search, foreign_key: {to_table: :case_study_searches}
      t.references :shared_by, foreign_key: {to_table: :users}

      t.timestamps
    end
  end
end
