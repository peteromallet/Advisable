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
      application = Application.find_by!(uid: id)
      application.status = "Invitation Rejected"
      application.invitation_rejection_reason = reason

      success = current_account_responsible_for do
        application.save
      end

      ApiError.invalid_request("FAILED_TO_REJECT_APPLICATION") unless success

      {application: application}
    end
  end
end
