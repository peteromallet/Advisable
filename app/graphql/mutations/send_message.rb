# frozen_string_literal: true

module Mutations
  class SendMessage < Mutations::BaseMutation
    description "Sends a message to a conversation"

    argument :attachments, [String], required: false
    argument :content, String, required: false
    argument :conversation, ID, required: true

    field :message, Types::Message, null: true

    def authorized?(conversation:, **_args)
      conversation = Conversation.find_by!(uid: conversation)
      policy = ConversationPolicy.new(current_user, conversation, current_account)
      return true if policy.create_message?

      ApiError.not_authorized("You do not have permission to send this message")
    end

    def resolve(conversation:, content:, attachments:)
      has_message_content?(content, attachments)
      conversation = Conversation.find_by!(uid: conversation)
      message = conversation.messages.create!(content: content, author: current_account)
      message.attachments.attach(attachments) if attachments
      conversation.mark_as_read_for!(current_account)
      message.reload.announce_message

      {message: message}
    end

    private

    def has_message_content?(content, attachments)
      return true if content.present? || attachments.present?

      ApiError.invalid_request("NO_MESSAGE_CONTENT", "You must include message content")
    end
  end
end
