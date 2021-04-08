# frozen_string_literal: true

module CaseStudy
  class Industry < ApplicationRecord
    belongs_to :article
    belongs_to :industry, class_name: "::Industry", inverse_of: :case_study_industries
  end
end

# == Schema Information
#
# Table name: case_study_industries
#
#  id          :uuid             not null, primary key
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  article_id  :uuid             not null
#  industry_id :bigint           not null
#
# Indexes
#
#  index_case_study_industries_on_article_id   (article_id)
#  index_case_study_industries_on_industry_id  (industry_id)
#
# Foreign Keys
#
#  fk_rails_...  (article_id => case_study_articles.id)
#  fk_rails_...  (industry_id => industries.id)
#
