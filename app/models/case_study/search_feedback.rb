# frozen_string_literal: true

module CaseStudy
  class SearchFeedback < ApplicationRecord
    belongs_to :search
    belongs_to :article
  end
end

# == Schema Information
#
# Table name: case_study_search_feedbacks
#
#  id         :bigint           not null, primary key
#  feedback   :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  article_id :bigint           not null
#  search_id  :bigint           not null
#
# Indexes
#
#  index_case_study_search_feedbacks_on_article_id  (article_id)
#  index_case_study_search_feedbacks_on_search_id   (search_id)
#
# Foreign Keys
#
#  fk_rails_...  (article_id => case_study_articles.id)
#  fk_rails_...  (search_id => case_study_searches.id)
#
