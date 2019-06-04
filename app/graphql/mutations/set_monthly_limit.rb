class Mutations::SetMonthlyLimit < Mutations::BaseMutation
  argument :application, ID, required: true
  argument :monthly_limit, Int, required: false

  field :application, Types::ApplicationType, null: true
  field :errors, [Types::Error], null: true

  def authorized?(**args)
    application = Application.find_by_airtable_id!(args[:application])
    policy = ApplicationPolicy.new(context[:current_user], application)
    return true if policy.is_client
    return false, { errors: [{ code: "not_authorized" }] }
  end

  def resolve(**args)
    application = Application.find_by_airtable_id(args[:application])
    application.update_attributes(monthly_limit: args[:monthly_limit])
    application.sync_to_airtable
    { application: application }
  end
end
