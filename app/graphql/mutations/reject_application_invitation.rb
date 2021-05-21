# frozen_string_literal: true

module Mutations
  class RejectApplicationInvitation < Mutations::BaseMutation
    argument :id, ID, required: true
    argument :reason, String, required: true

    field :application, Types::ApplicationType, null: true

    def authorized?(id:, **_args)
      requires_specialist!
      application = Application.find_by!(uid: id)
      policy = ApplicationPolicy.new(current_user, application)
      policy.reject_invitation?
    end

    def resolve(id:, reason:)
      application = Application.find_by_uid_or_airtable_id!(id)
      application.status = 'Invitation Rejected'
      application.invitation_rejection_reason = reason

      success = Logidze.with_responsible(current_account_id) do
        application.save
      end

      ApiError.invalid_request("FAILED_TO_REJECT_APPLICATION") unless success

      application.sync_to_airtable
      {application: application}
    end
  end
end
