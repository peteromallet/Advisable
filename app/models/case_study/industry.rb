# frozen_string_literal: true

module CaseStudy
  class Industry < ApplicationRecord
    include Uid
    uid_prefix "csi"

    has_logidze

    belongs_to :article
    belongs_to :industry, class_name: "::Industry", inverse_of: :case_study_industries
  end
end

# == Schema Information
#
# Table name: case_study_industries
#
#  id          :integer          not null, primary key
#  uid         :string           not null
#  article_id  :integer          not null
#  industry_id :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
# Indexes
#
#  index_case_study_industries_on_article_id   (article_id)
#  index_case_study_industries_on_industry_id  (industry_id)
#  index_case_study_industries_on_uid          (uid) UNIQUE
#
