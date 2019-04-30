class Mutations::StartWorking < Mutations::BaseMutation
  argument :application, ID, required: true

  field :application, Types::ApplicationType, null: true
  field :errors, [Types::Error], null: true

  def authorized?(**args)
    application = Application.find_by_airtable_id!(args[:application])
    policy = ApplicationPolicy.new(context[:current_user], application)
    return true if policy.is_specialist_or_client
    return false, { errors: [{ code: "not_authorized" }] }
  end

  def resolve(**args)
    application = Application.find_by_airtable_id!(args[:application])
    application = Applications::StartWorking.call(application: application)
    { application: application }

    rescue Service::Error => e
      return { errors: [e] }
  end
end
