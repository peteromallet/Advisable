class Mutations::ApplyForProject < Mutations::BaseMutation
  argument :project, ID, required: true

  field :application, Types::ApplicationType, null: false

  def authorized?(**args)
    requires_specialist!
  end

  def resolve(**args)
    project = Project.find_by_uid!(args[:project])
    if project.status != "Brief Confirmed"
      ApiError.invalid_request(
        code: "PROJECT_IN_A_WRONG_STATE",
        message: "Project is not in 'Brief Confirmed' state"
      )
    end

    application = Application.find_or_create_by(project: project, specialist: current_user) do |app|
      app.status = "Invited To Apply"
      app.accepts_fee = false
      app.accepts_terms = false
      app.featured = false
      app.references_requested = false
    end

    unless ["Invited To Apply", "Applied"].include?(application.status)
      ApiError.invalid_request(
        code: "APPLICATION_IN_A_WRONG_STATE",
        message: "Application exists already but is not in 'Invited To Apply' state"
      )
    end

    # This is not in master yet
    application.save_and_sync!
    { application: application }
  end
end
