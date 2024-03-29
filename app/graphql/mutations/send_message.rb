# frozen_string_literal: true

module Mutations
  class SendMessage < Mutations::BaseMutation
    description "Sends a message to a conversation"

    argument :attachments, [String], required: false
    argument :content, String, required: false
    argument :conversation, ID, required: true
    argument :uid, String, required: false

    field :message, Types::UserMessage, null: true

    def authorized?(conversation:, **_args)
      conversation = Conversation.find_by!(uid: conversation)
      policy = ConversationPolicy.new(current_user, conversation, current_account)
      return true if policy.create_message?

      ApiError.not_authorized("You do not have permission to send this message")
    end

    def resolve(conversation:, content:, attachments: nil, uid: nil)
      has_message_content?(content, attachments)
      conversation = Conversation.find_by!(uid: conversation)
      message = conversation.new_message!(author: current_account, content:, attachments:, uid:)

      {message:}
    end

    private

    def has_message_content?(content, attachments)
      return true if content.present? || attachments.present?

      ApiError.invalid_request("NO_MESSAGE_CONTENT", "You must include message content")
    end
  end
end
