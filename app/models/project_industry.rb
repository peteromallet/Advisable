class ProjectIndustry < ApplicationRecord
  belongs_to :industry
  belongs_to :project, polymorphic: true
end

# == Schema Information
#
# Table name: project_industries
#
#  id           :bigint           not null, primary key
#  primary      :boolean
#  project_type :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  industry_id  :bigint
#  project_id   :bigint
#
# Indexes
#
#  index_project_industries_on_industry_id                  (industry_id)
#  index_project_industries_on_project_type_and_project_id  (project_type,project_id)
#
# Foreign Keys
#
#  fk_rails_...  (industry_id => industries.id)
#
