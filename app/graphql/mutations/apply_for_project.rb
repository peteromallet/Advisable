# frozen_string_literal: true

module Mutations
  class ApplyForProject < Mutations::BaseMutation
    argument :project, ID, required: true

    field :application, Types::ApplicationType, null: false

    def authorized?(**_args)
      requires_specialist!
    end

    def resolve(**args)
      project = Project.find_by_uid_or_airtable_id!(args[:project])

      ApiError.invalid_request("PROJECT_NOT_CONFIRMED", "Project brief has not been confirmed") if project.brief_confirmed_at.nil?

      application = Application.find_or_create_by(project: project, specialist: current_user) do |app|
        app.status = "Invited To Apply"
        app.accepts_fee = false
        app.accepts_terms = false
        app.featured = false
      end

      ApiError.invalid_request("APPLICATION_IN_A_WRONG_STATE", "Application exists already but is not in 'Invited To Apply' state") unless ["Invited To Apply", "Applied"].include?(application.status)

      save_with_current_account!(application)

      {application: application}
    end
  end
end
