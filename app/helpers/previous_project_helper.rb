# frozen_string_literal: true

module PreviousProjectHelper
  def previous_project_company_name(project)
    return if project.blank?

    if project.confidential? && !project.draft?
      industry_and_company_type(project)
    else
      project.client_name
    end
  end

  private

  def industry_and_company_type(project)
    [project.primary_industry&.name, project.company_type || "company"].compact.join(" ")
  end
end
