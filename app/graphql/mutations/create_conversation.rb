# frozen_string_literal: true

module Mutations
  class CreateConversation < Mutations::BaseMutation
    description "Creates a conversation between current account and participant accounts passed in"

    argument :attachments, [String], required: false
    argument :content, String, required: true
    argument :participants, [String], required: true

    field :conversation, Types::Conversation, null: false
    field :message, Types::UserMessage, null: false

    def authorized?(**_args)
      requires_current_user!
    end

    def resolve(participants:, content:, attachments: nil)
      has_message_content?(content, attachments)

      @accounts = (participants.map { |uid| Account.find_by!(uid: uid) } + [current_account]).uniq
      has_participants?

      conversation = Conversation.by_accounts(@accounts)
      message = conversation.new_message!(current_account, content, attachments)

      {conversation: conversation, message: message}
    end

    private

    def has_message_content?(content, attachments)
      return true if content.present? || attachments.present?

      ApiError.invalid_request("NO_MESSAGE_CONTENT", "You must include message content")
    end

    def has_participants?
      return true if @accounts.size > 1

      ApiError.invalid_request("NO_PARTICIPANTS", "You must have at least one participant besides yourself!")
    end
  end
end
