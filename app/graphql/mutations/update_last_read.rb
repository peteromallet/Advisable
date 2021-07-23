# frozen_string_literal: true

module Mutations
  class UpdateLastRead < Mutations::BaseMutation
    description "Updates last read of a conversation for current_account participant"

    argument :conversation, ID, required: true

    field :conversation, Types::Conversation, null: true

    def authorized?(conversation:)
      conversation = Conversation.find_by!(uid: conversation)
      policy = ConversationPolicy.new(current_user, conversation, current_account)
      return true if policy.update_last_read?

      ApiError.not_authorized("You do not have permission to update last read")
    end

    def resolve(conversation:)
      conversation = Conversation.find_by!(uid: conversation)
      conversation.mark_as_read_for!(current_account)
      {conversation: conversation}
    end
  end
end
