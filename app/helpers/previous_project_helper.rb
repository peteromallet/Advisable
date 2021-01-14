# frozen_string_literal: true

module PreviousProjectHelper
  def previous_project_company_name(project)
    return industry_and_company_type(project) if project.confidential? && !project.draft?

    project.client_name
  end

  private

  def industry_and_company_type(project)
    [project.primary_industry&.name, project.company_type || "company"].compact.join(" ")
  end
end
