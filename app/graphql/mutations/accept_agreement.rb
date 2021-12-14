# frozen_string_literal: true

module Mutations
  class AcceptAgreement < Mutations::BaseMutation
    argument :agreement, ID, required: true
    argument :message, String, required: false

    field :agreement, Types::Agreement, null: true

    def authorized?(**_args)
      requires_client!
    end

    def resolve(agreement:, **args)
      agreement = Agreement.find_by!(uid: agreement)

      current_account_responsible_for do
        agreement.update!(status: "accepted")
      end

      conversation = Conversation.by_accounts(agreement.specialist, current_account)
      conversation.new_message!(nil, nil, kind: "AgreementAccepted", send_emails: false)
      conversation.new_message!(current_account, args[:message]) if args[:message].present?

      {agreement: agreement}
    end
  end
end
