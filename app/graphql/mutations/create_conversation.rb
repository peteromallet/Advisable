# frozen_string_literal: true

module Mutations
  class CreateConversation < Mutations::BaseMutation
    description "Creates a conversation between current account and participant accounts passed in"

    argument :attachments, [String], required: false
    argument :content, String, required: true
    argument :participants, [String], required: true

    field :conversation, Types::Conversation, null: false
    field :message, Types::MessageInterface, null: false

    def authorized?(**_args)
      requires_current_user!
    end

    def resolve(participants:, content:, attachments: nil)
      has_message_content?(content, attachments)

      participant_accounts = participants.map { |uid| Account.find_by!(uid:) }
      accounts = (participant_accounts + [current_account]).uniq
      ApiError.invalid_request("NO_PARTICIPANTS", "You must have at least one participant besides yourself!") if accounts.size < 2

      conversation = Conversation.by_accounts(accounts) do
        Analytics.track(current_user, "Created Conversation", {accounts: accounts.map(&:uid)})
        Slack.bg_message(channel: "consultation_requests", text: "#{current_user.name_with_company} has connected with #{participant_accounts.map(&:name).to_sentence} via messaging.")
      end
      message = conversation.new_message!(author: current_account, content:, attachments:)

      {conversation:, message:}
    end

    private

    def has_message_content?(content, attachments)
      return true if content.present? || attachments.present?

      ApiError.invalid_request("NO_MESSAGE_CONTENT", "You must include message content")
    end
  end
end
