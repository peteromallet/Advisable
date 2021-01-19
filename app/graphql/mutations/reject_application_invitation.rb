# frozen_string_literal: true

class Mutations::RejectApplicationInvitation < Mutations::BaseMutation
  argument :id, ID, required: true
  argument :reason, String, required: true

  field :application, Types::ApplicationType, null: true

  def resolve(id:, reason:)
    application = Applications::RejectApplicationInvitation.call(
      application_id: id,
      reason: reason,
      current_account_id: current_account_id
    )

    {application: application}
  end
end
