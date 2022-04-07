# frozen_string_literal: true

class CreateCaseStudyInterestArticles < ActiveRecord::Migration[7.0]
  def change
    create_table :case_study_interest_articles do |t|
      t.references :interest, null: false, foreign_key: {to_table: :case_study_interests}
      t.references :article, null: false, foreign_key: {to_table: :case_study_articles}
      t.decimal :similarity
      t.boolean :favorite

      t.index %i[interest_id article_id], unique: true, name: "index_interest_articles_on_interest_id_and_article_id"

      t.timestamps
    end
  end
end
