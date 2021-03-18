# frozen_string_literal: true

module Mutations
  class SendProposal < Mutations::BaseMutation
    argument :application, ID, required: true
    argument :proposal_comment, String, required: false

    field :application, Types::ApplicationType, null: true

    def authorized?(**args)
      application = Application.find_by_uid_or_airtable_id!(args[:application])
      policy = ApplicationPolicy.new(context[:current_user], application)
      return true if policy.send_proposal?

      ApiError.not_authorized("You do not have permission to send this proposal")
    end

    def resolve(**args)
      application = Application.find_by_uid_or_airtable_id!(args[:application])

      {application: Proposals::Send.call(application: application, comment: args[:proposal_comment], current_account_id: current_account_id)}
    rescue Service::Error => e
      ApiError.service_error(e)
    end
  end
end
