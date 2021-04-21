# frozen_string_literal: true

module CaseStudy
  class Skill < ApplicationRecord
    include Uid
    uid_prefix "csk"

    has_logidze

    belongs_to :article
    belongs_to :skill, class_name: "::Skill", inverse_of: :case_study_skills
  end
end

# == Schema Information
#
# Table name: case_study_skills
#
#  id         :bigint           not null, primary key
#  primary    :boolean
#  uid        :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  article_id :bigint           not null
#  skill_id   :bigint           not null
#
# Indexes
#
#  index_case_study_skills_on_article_id  (article_id)
#  index_case_study_skills_on_skill_id    (skill_id)
#  index_case_study_skills_on_uid         (uid)
#
# Foreign Keys
#
#  fk_rails_...  (article_id => case_study_articles.id)
#  fk_rails_...  (skill_id => skills.id)
#
