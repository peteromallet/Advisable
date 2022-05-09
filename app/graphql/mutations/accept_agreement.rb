# frozen_string_literal: true

module Mutations
  class AcceptAgreement < Mutations::BaseMutation
    argument :agreement, ID, required: true

    field :agreement, Types::Agreement, null: true

    def authorized?(agreement:)
      requires_client!

      agreement = Agreement.find_by!(uid: agreement)
      policy = AgreementPolicy.new(current_user, agreement)
      return true if policy.accept?

      ApiError.not_authorized("You do not have permission to accept this Agreement")
    end

    def resolve(agreement:)
      agreement = Agreement.find_by!(uid: agreement)
      ApiError.invalid_request("NOT_IN_AN_ACCEPTABLE_STATE") unless agreement.acceptable?
      ApiError.invalid_request("PAYMENTS_NOT_SETUP", "Payments are not setup for this company.") unless agreement.company.payments_setup

      current_account_responsible_for { agreement.update!(status: "accepted") }
      conversation = Conversation.by_accounts(agreement.specialist, current_user.account)
      conversation.new_message!(kind: "AgreementAccepted", agreement:, send_emails: false)
      SpecialistMailer.agreement_accepted(agreement).deliver_later
      Slack.bg_message(channel: "consultation_requests", text: "The Agreement #{agreement.uid} between #{agreement.specialist.account.name} and #{agreement.company.name} has been accepted!")
      ::Analytics.track(current_user, "Hired Freelancer", {
        agreement: agreement.uid
      })

      {agreement:}
    end
  end
end
