# frozen_string_literal: true

module Mutations
  class AcceptAgreement < Mutations::BaseMutation
    argument :agreement, ID, required: true

    field :agreement, Types::Agreement, null: true

    def authorized?(**_args)
      requires_client!
    end

    def resolve(agreement:)
      agreement = Agreement.find_by!(uid: agreement)

      current_account_responsible_for do
        agreement.update!(status: "accepted")
      end

      conversation = Conversation.by_accounts(agreement.specialist, current_account)
      conversation.new_message!(kind: "AgreementAccepted", agreement:, send_emails: false)

      {agreement:}
    end
  end
end
