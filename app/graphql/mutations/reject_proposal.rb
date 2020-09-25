class Mutations::RejectProposal < Mutations::BaseMutation
  argument :id, ID, required: true
  argument :reason, String, required: true
  argument :comment, String, required: false

  field :application, Types::ApplicationType, null: true
  field :errors, [Types::Error], null: true

  def authorized?(**args)
    application = Application.find_by_uid_or_airtable_id!(args[:id])
    policy = ApplicationPolicy.new(context[:current_user], application)
    return true if policy.is_client
    [false, { errors: [{ code: "not_authorized" }] }]
  end

  def resolve(**args)
    application = Application.find_by_uid_or_airtable_id!(args[:id])

    {
      application: Proposals::Reject.call(
        application: application,
        reason: args[:reason],
        comment: args[:comment]
      )
    }

    rescue Service::Error => e
      { errors: [e] }
  end
end
