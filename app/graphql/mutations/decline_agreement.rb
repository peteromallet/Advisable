# frozen_string_literal: true

module Mutations
  class DeclineAgreement < Mutations::BaseMutation
    argument :agreement, ID, required: true
    argument :message, String, required: false

    field :agreement, Types::Agreement, null: true

    def authorized?(agreement:, **_args)
      requires_client!

      agreement = Agreement.find_by!(uid: agreement)
      policy = AgreementPolicy.new(current_user, agreement)
      return true if policy.accept?

      ApiError.not_authorized("You do not have permission to decline this Agreement")
    end

    def resolve(agreement:, **args)
      agreement = Agreement.find_by!(uid: agreement)
      ApiError.invalid_request("NOT_IN_AN_DECLINABLE_STATE") unless agreement.acceptable?

      current_account_responsible_for { agreement.update!(status: "declined", reason: args[:message]) }
      conversation = Conversation.by_accounts(agreement.specialist, current_user.account)
      conversation.new_message!(kind: "AgreementDeclined", agreement:, send_emails: false)
      conversation.new_message!(author: current_account, content: args[:message], send_emails: false) if args[:message].present?
      Slack.bg_message(channel: "consultation_requests", text: "#{current_user.name_with_company} has declined #{agreement.specialist.account.name} agreement (#{agreement.uid}). They provided the following reason: \"#{args[:message]}\".")

      {agreement:}
    end
  end
end
