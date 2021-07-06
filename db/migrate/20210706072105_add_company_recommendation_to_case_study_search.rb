# frozen_string_literal: true

class AddCompanyRecommendationToCaseStudySearch < ActiveRecord::Migration[6.1]
  def change
    add_column :case_study_searches, :company_recomendation, :boolean
  end
end
