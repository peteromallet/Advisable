class Mutations::AcceptProposal < Mutations::BaseMutation
  argument :id, ID, required: true
  field :application, Types::ApplicationType, null: true
  field :errors, [Types::Error], null: true

  def authorized?(id:)
    application = Application.find_by_airtable_id!(id)
    policy = ApplicationPolicy.new(context[:current_user], application)
    return true if policy.is_client
    return false, { errors: [{ code: "not_authorized" }] }
  end

  def resolve(id:)
    application = Application.find_by_airtable_id!(id)

    {
      application: Proposals::Accept.call(application: application)
    }

    rescue Service::Error => e
      return { errors: [e] }
  end
end