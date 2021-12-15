# frozen_string_literal: true

module CaseStudy
  class SearchFeedback < ApplicationRecord
    has_logidze

    belongs_to :search
    belongs_to :article

    scope :resolved, -> { where.not(resolved_at: nil) }
    scope :unresolved, -> { where(resolved_at: nil) }
  end
end

# == Schema Information
#
# Table name: case_study_search_feedbacks
#
#  id          :integer          not null, primary key
#  search_id   :integer          not null
#  article_id  :integer          not null
#  feedback    :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  resolved_at :datetime
#
# Indexes
#
#  index_case_study_search_feedbacks_on_article_id  (article_id)
#  index_case_study_search_feedbacks_on_search_id   (search_id)
#
