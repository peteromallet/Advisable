# frozen_string_literal: true

class AddCaseStudyArticlesToReviews < ActiveRecord::Migration[6.1]
  def change
    safety_assured do
      add_reference :reviews, :case_study_article, foreign_key: {to_table: :case_study_articles}
      add_column :reviews, :first_name, :string
      add_column :reviews, :last_name, :string
    end
  end
end
