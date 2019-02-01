class ProjectSkill < ApplicationRecord
  belongs_to :skill
  belongs_to :project, polymorphic: true
end
