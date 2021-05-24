# frozen_string_literal: true

class Mutations::ApplyForProject < Mutations::BaseMutation
  argument :project, ID, required: true

  field :application, Types::ApplicationType, null: false

  def authorized?(**args)
    requires_specialist!
  end

  def resolve(**args)
    project = Project.find_by_uid_or_airtable_id!(args[:project])

    if project.brief_confirmed_at.nil?
      ApiError.invalid_request("PROJECT_NOT_CONFIRMED", "Project brief has not been confirmed")
    end

    application = Application.find_or_create_by(project: project, specialist: current_user) do |app|
      app.status = "Invited To Apply"
      app.accepts_fee = false
      app.accepts_terms = false
      app.featured = false
    end

    unless ["Invited To Apply", "Applied"].include?(application.status)
      ApiError.invalid_request("APPLICATION_IN_A_WRONG_STATE", "Application exists already but is not in 'Invited To Apply' state")
    end

    application.save_and_sync_with_responsible!(current_account_id)

    {application: application}
  end
end
