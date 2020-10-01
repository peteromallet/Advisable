class Mutations::SendProposal < Mutations::BaseMutation
  argument :application, ID, required: true
  argument :proposal_comment, String, required: false

  field :application, Types::ApplicationType, null: true
  field :errors, [Types::Error], null: true

  def authorized?(**args)
    application = Application.find_by_uid_or_airtable_id!(args[:application])
    policy = ApplicationPolicy.new(context[:current_user], application)
    return true if policy.is_specialist
    [false, { errors: [{ code: 'not_authorized' }] }]
  end

  def resolve(**args)
    application = Application.find_by_uid_or_airtable_id!(args[:application])

    {
      application:
        Proposals::Send.call(
          application: application, comment: args[:proposal_comment]
        )
    }
  rescue Service::Error => e
    { errors: [e] }
  end
end
