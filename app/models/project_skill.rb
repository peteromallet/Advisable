class ProjectSkill < ApplicationRecord
  belongs_to :skill, counter_cache: :projects_count
  belongs_to :project, polymorphic: true
end
