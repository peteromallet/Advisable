# frozen_string_literal: true

module Mutations
  class CreatePreviousProject < Mutations::BaseMutation
    # TODO: Eventually the specialist ID should be removed and this mutation should expect a specialist to be logged in.
    argument :specialist, ID, required: false, deprecation_reason: "Do not provide this anymore"
    argument :client_name, String, required: true
    argument :confidential, Boolean, required: false
    argument :industries, [String], required: true
    argument :primary_industry, String, required: true
    argument :company_type, String, required: true

    field :previous_project, Types::PreviousProject, null: true

    def authorized?(**_args)
      requires_specialist!
    end

    def resolve(**args)
      project = current_user.previous_projects.new(
        client_name: args[:client_name],
        confidential: args[:confidential],
        company_type: args[:company_type],
        description: args[:description],
        validation_status: "Pending",
        draft: true
      )

      args[:industries].each do |industry|
        project.project_industries <<
          ProjectIndustry.new(
            industry: Industry.find_by_name!(industry),
            primary: args[:primary_industry] == industry
          )
      end

      current_account_responsible_for { project.save }

      {previous_project: project}
    end
  end
end
