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

    def authorized?(**_args)
      requires_specialist!
    end

    def resolve(user:, **args)
      agreement = current_user.agreements.build(args.except(:attachments, :message))
      agreement.user = User.find_by!(uid: user)
      agreement.company = agreement.user.company
      agreement.status = "pending"

      save_with_current_account!(agreement)

      conversation = Conversation.by_accounts(agreement.specialist, current_account)
      conversation.new_message!(nil, nil, kind: "AgreementCreated", send_emails: false)
      conversation.new_message!(current_account, args[:message], attachments: args[:attachments])

      {agreement: agreement}
    end
  end
end
