# frozen_string_literal: true

module Mutations
  class DeclineAgreement < Mutations::BaseMutation
    argument :agreement, ID, required: true
    argument :message, String, required: false

    field :agreement, Types::Agreement, null: true

    def authorized?(**_args)
      requires_client!
    end

    def resolve(agreement:, **args)
      agreement = Agreement.find_by!(uid: agreement)

      current_account_responsible_for { agreement.update!(status: "declined", reason: args[:message]) }
      conversation = Conversation.by_accounts(agreement.specialist, current_account)
      conversation.new_message!(kind: "AgreementDeclined", agreement:, send_emails: false)
      conversation.new_message!(author: current_account, content: args[:message], send_emails: false) if args[:message].present?
      Slack.bg_message(channel: "consultation_requests", text: "The Agreement #{agreement.uid} between #{agreement.specialist.account.name} and #{agreement.company.name} has been declined!")

      {agreement:}
    end
  end
end
