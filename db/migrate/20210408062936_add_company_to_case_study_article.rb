# frozen_string_literal: true

class AddCompanyToCaseStudyArticle < ActiveRecord::Migration[6.1]
  def change
    safety_assured do
      add_reference :case_study_articles, :case_study_company, foreign_key: true, type: :uuid
    end
  end
end
