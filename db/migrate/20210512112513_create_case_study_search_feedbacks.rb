# frozen_string_literal: true

class CreateCaseStudySearchFeedbacks < ActiveRecord::Migration[6.1]
  def change
    create_table :case_study_search_feedbacks do |t|
      t.references :search, null: false, foreign_key: {to_table: :case_study_searches}
      t.references :article, null: false, foreign_key: {to_table: :case_study_articles}
      t.text :feedback

      t.timestamps
    end
  end
end
