# frozen_string_literal: true

class CreateCaseStudyArticleFeedbacks < ActiveRecord::Migration[6.1]
  def change
    create_table :case_study_article_feedbacks do |t|
      t.references :article, null: false, foreign_key: {to_table: :case_study_articles}
      t.references :skill, null: true, foreign_key: {to_table: :case_study_skills}
      t.text :feedback

      t.timestamps
    end
  end
end
