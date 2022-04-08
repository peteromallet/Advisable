# frozen_string_literal: true

class CreateCaseStudyFavoritedArticles < ActiveRecord::Migration[7.0]
  def change
    create_table :case_study_favorited_articles do |t|
      t.references :account, null: false, foreign_key: true
      t.references :article, null: false, foreign_key: {to_table: :case_study_articles}
      t.index %i[account_id article_id], unique: true, name: "index_cs_favorited_articles_on_account_and_article"

      t.timestamps
    end
  end
end
