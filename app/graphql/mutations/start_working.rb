class Mutations::StartWorking < Mutations::BaseMutation
  argument :application, ID, required: true
  argument :project_type, String, required: true
  argument :monthly_limit, Int, required: false

  field :application, Types::ApplicationType, null: true

  def authorized?(**args)
    application = Application.find_by_uid_or_airtable_id!(args[:application])
    policy = ApplicationPolicy.new(context[:current_user], application)
    return true if policy.is_client
    raise ApiError::NotAuthorized.new(
      "You do not have permission to execute this mutation"
    )
  end

  def resolve(**args)
    application = Application.find_by_uid_or_airtable_id!(args[:application])
    application = Applications::StartWorking.call(application: application, project_type: args[:project_type], monthly_limit: args[:monthly_limit])
    { application: application }
  end
end
