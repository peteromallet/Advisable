# frozen_string_literal: true

module CaseStudy
  class Insight < ApplicationRecord
    include Uid
    uid_prefix "csn"

    belongs_to :article
  end
end

# == Schema Information
#
# Table name: case_study_insights
#
#  id          :bigint           not null, primary key
#  description :text
#  title       :string
#  uid         :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  airtable_id :string
#  article_id  :bigint           not null
#
# Indexes
#
#  index_case_study_insights_on_article_id  (article_id)
#  index_case_study_insights_on_uid         (uid) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (article_id => case_study_articles.id)
#
