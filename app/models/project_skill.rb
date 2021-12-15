# frozen_string_literal: true

class ProjectSkill < ApplicationRecord
  belongs_to :skill, counter_cache: :projects_count
  belongs_to :project, polymorphic: true
  delegate :name, to: :skill
end

# == Schema Information
#
# Table name: project_skills
#
#  id           :integer          not null, primary key
#  skill_id     :integer
#  project_type :string
#  project_id   :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  primary      :boolean
#
# Indexes
#
#  index_project_skills_on_project   (project_type,project_id)
#  index_project_skills_on_skill_id  (skill_id)
#
