# frozen_string_literal: true

module CaseStudy
  class Skill < ApplicationRecord
    include Uid
    uid_prefix "csk"

    has_logidze

    scope :primary, -> { where(primary: true) }

    belongs_to :article, optional: true
    belongs_to :search, optional: true
    belongs_to :skill, class_name: "::Skill", inverse_of: :case_study_skills
  end
end

# == Schema Information
#
# Table name: case_study_skills
#
#  id         :integer          not null, primary key
#  uid        :string           not null
#  primary    :boolean
#  article_id :integer
#  skill_id   :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  search_id  :integer
#
# Indexes
#
#  index_case_study_skills_on_article_id  (article_id)
#  index_case_study_skills_on_search_id   (search_id)
#  index_case_study_skills_on_skill_id    (skill_id)
#  index_case_study_skills_on_uid         (uid) UNIQUE
#
