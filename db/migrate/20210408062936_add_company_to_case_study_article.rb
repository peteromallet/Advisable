# frozen_string_literal: true

class AddCompanyToCaseStudyArticle < ActiveRecord::Migration[6.1]
  def change
    safety_assured do
      add_reference :case_study_articles, :company, foreign_key: {to_table: :case_study_companies}, type: :uuid
    end
  end
end
