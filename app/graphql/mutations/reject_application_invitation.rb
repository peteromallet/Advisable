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
      application = Applications::RejectApplicationInvitation.call(
        application_id: id,
        reason: reason,
        current_account_id: current_account_id
      )

      {application: application}
    end
  end
end
