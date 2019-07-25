# Sets an application status to 'Stopped Working'. This is when the client
# has decided to stop working with a freelancer.
class Mutations::StopWorking < Mutations::BaseMutation
  description <<~HEREDOC
    Sets a given applications status to 'Not Working'.
  HEREDOC

  argument :application, ID, required: true do
    description "The UID of the application."
  end

  argument :reason, String, required: false do
    description "The reason why the the client is ending the work."
  end

  field :application, Types::ApplicationType, null: true

  def authorized?(**args)
    application = Application.find_by_uid!(args[:application])
    policy = ApplicationPolicy.new(context[:current_user], application)
    return true if policy.is_client
    raise APIError::NotAuthorized.new(
      "You do not have permission to execute this mutation"
    )
  end

  def resolve(**args)
    application = Application.find_by_uid!(args[:application])

    if application.status != "Working"
      raise APIError::InvalidRequest.new(
        "applicationStatusNotWorking",
        "The application status must be 'Working'."
      )
    end

    application.update_attributes(
      status: "Stopped Working",
      stopped_working_reason: args[:reason]
    )

    application.sync_to_airtable

    { application: application }
  end
end
