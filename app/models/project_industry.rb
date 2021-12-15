# frozen_string_literal: true
class ProjectIndustry < ApplicationRecord
  belongs_to :industry
  belongs_to :project, polymorphic: true
end

# == Schema Information
#
# Table name: project_industries
#
#  id           :integer          not null, primary key
#  industry_id  :integer
#  project_type :string
#  project_id   :integer
#  primary      :boolean
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
# Indexes
#
#  index_project_industries_on_industry_id                  (industry_id)
#  index_project_industries_on_project_type_and_project_id  (project_type,project_id)
#
