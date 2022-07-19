# frozen_string_literal: true

module Mutations
  class CreateAgreement < Mutations::BaseMutation
    argument :attachments, [String], required: false
    argument :collaboration, String, required: true
    argument :hourly_rate, Int, required: false
    argument :invoicing, String, required: true
    argument :message, String, required: true
    argument :user, ID, required: true

    field :agreement, Types::Agreement, null: true
    field :conversation, Types::Conversation, null: true

    def authorized?(**_args)
      requires_specialist!
    end

    def resolve(user:, **args)
      agreement = current_user.agreements.build(args.except(:attachments, :message))
      agreement.user = User.find_by!(uid: user)
      agreement.company = agreement.user.company
      agreement.status = "pending"

      save_with_current_account!(agreement)

      conversation = Conversation.by_accounts(agreement.user, current_user.account)
      conversation.new_message!(
        author: current_account,
        content: args[:message],
        agreement:,
        kind: "AgreementCreated",
        attachments: args[:attachments],
        send_emails: false
      )

      UserMailer.new_agreement(agreement).deliver_later
      SlackMessageJob.perform_later(channel: "client_activity", text: "The Agreement #{agreement.uid} between #{agreement.specialist.account.name} and #{agreement.company.name} has been created!")

      {agreement:, conversation:}
    end
  end
end
