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
#  id         :bigint           not null, primary key
#  feedback   :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  article_id :bigint           not null
#  skill_id   :bigint
#
# Indexes
#
#  index_case_study_article_feedbacks_on_article_id  (article_id)
#  index_case_study_article_feedbacks_on_skill_id    (skill_id)
#
# Foreign Keys
#
#  fk_rails_...  (article_id => case_study_articles.id)
#  fk_rails_...  (skill_id => case_study_skills.id)
#
