class ProjectIndustry < ApplicationRecord
  belongs_to :industry
  belongs_to :project, polymorphic: true
end
