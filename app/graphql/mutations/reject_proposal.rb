# frozen_string_literal: true

class Mutations::RejectProposal < Mutations::BaseMutation
  argument :id, ID, required: true
  argument :reason, String, required: true
  argument :comment, String, required: false

  field :application, Types::ApplicationType, null: true

  def authorized?(**args)
    application = Application.find_by_uid_or_airtable_id!(args[:id])
    policy = ApplicationPolicy.new(context[:current_user], application)
    return true if policy.reject_proposal?

    ApiError.not_authorized("You do not have permission to reject this proposal")
  end

  def resolve(**args)
    application = Application.find_by_uid_or_airtable_id!(args[:id])
    application = Proposals::Reject.call(
      application: application,
      reason: args[:reason],
      comment: args[:comment],
      current_account_id: current_account_id
    )
    {application: application}
  rescue Service::Error => e
    ApiError.service_error(e)
  end
end
