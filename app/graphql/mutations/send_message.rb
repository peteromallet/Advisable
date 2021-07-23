# frozen_string_literal: true

module Mutations
  class SendMessage < Mutations::BaseMutation
    description "Sends a message to a conversation"

    argument :attachments, [String], required: false
    argument :content, String, required: true
    argument :conversation, ID, required: true

    field :conversation, Types::Conversation, null: true

    def authorized?(conversation:, **_args)
      conversation = Conversation.find_by!(uid: conversation)
      policy = ConversationPolicy.new(current_user, conversation, current_account)
      return true if policy.create_message?

      ApiError.not_authorized("You do not have permission to send this message")
    end

    def resolve(conversation:, content:, **args)
      conversation = Conversation.find_by!(uid: conversation)
      conversation.messages.create!(content: content, author: current_account)
      conversation.attachments.attach!(args[:attachments]) if args[:attachments]

      participant = conversation.participants.find_by(account_id: current_account_id)
      participant&.update!(last_read_at: Time.zone.now)

      {conversation: conversation}
    end
  end
end
