class Mutations::StartWorking < Mutations::BaseMutation
  argument :application, ID, required: true
  argument :project_type, String, required: true
  argument :monthly_limit, Int, required: false

  field :application, Types::ApplicationType, null: true
  field :errors, [Types::Error], null: true

  def authorized?(**args)
    application = Application.find_by_airtable_id!(args[:application])
    policy = ApplicationPolicy.new(context[:current_user], application)
    return true if policy.is_client
    raise APIError::NotAuthorized.new(
      "You do not have permission to execute this mutation"
    )
  end

  def resolve(**args)
    application = Application.find_by_airtable_id!(args[:application])
    application = Applications::StartWorking.call(application: application, project_type: args[:project_type], monthly_limit: args[:monthly_limit])
    { application: application }

    rescue Service::Error => e
      return { errors: [e] }
  end
end
