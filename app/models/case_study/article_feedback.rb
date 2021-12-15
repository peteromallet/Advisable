# frozen_string_literal: true

module CaseStudy
  class ArticleFeedback < ApplicationRecord
    belongs_to :article
    belongs_to :skill, optional: true
  end
end

# == Schema Information
#
# Table name: case_study_article_feedbacks
#
#  id         :integer          not null, primary key
#  article_id :integer          not null
#  skill_id   :integer
#  feedback   :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_case_study_article_feedbacks_on_article_id  (article_id)
#  index_case_study_article_feedbacks_on_skill_id    (skill_id)
#
