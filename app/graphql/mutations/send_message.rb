# frozen_string_literal: true

module Mutations
  class SendMessage < Mutations::BaseMutation
    description "Sends a message to a conversation"

    argument :attachments, [String], required: false
    argument :content, String, required: true
    argument :conversation, ID, required: true

    field :message, Types::Message, null: true

    def authorized?(conversation:, **_args)
      conversation = Conversation.find_by!(uid: conversation)
      policy = ConversationPolicy.new(current_user, conversation, current_account)
      return true if policy.create_message?

      ApiError.not_authorized("You do not have permission to send this message")
    end

    def resolve(conversation:, content:, **args)
      conversation = Conversation.find_by!(uid: conversation)
      message = conversation.messages.create!(content: content, author: current_account)
      conversation.attachments.attach!(args[:attachments]) if args[:attachments]
      conversation.mark_as_read_for!(current_account)
      {message: message}
    end
  end
end
