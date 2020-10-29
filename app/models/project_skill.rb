class ProjectSkill < ApplicationRecord
  belongs_to :skill, counter_cache: :projects_count
  belongs_to :project, polymorphic: true
  delegate :name, to: :skill
end

# == Schema Information
#
# Table name: project_skills
#
#  id           :bigint           not null, primary key
#  primary      :boolean
#  project_type :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  project_id   :bigint
#  skill_id     :bigint
#
# Indexes
#
#  index_project_skills_on_project_type_and_project_id  (project_type,project_id)
#  index_project_skills_on_skill_id                     (skill_id)
#
# Foreign Keys
#
#  fk_rails_...  (skill_id => skills.id)
#
