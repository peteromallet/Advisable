# frozen_string_literal: true

class RemoveCompanyRecommendationFromCaseStudySearch < ActiveRecord::Migration[6.1]
  def change
    safety_assured do
      remove_column :case_study_searches, :company_recomendation, :boolean
    end
  end
end
