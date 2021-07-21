# frozen_string_literal: true

module Subscriptions
  class ReceivedMessage < Subscriptions::BaseSubscription
    description "A message was received on current_user's conversation"

    subscription_scope :current_user_id
    field :conversation, Types::Conversation, null: false
    field :message, Types::Message, null: false

    def subscribe
      :no_response
    end

    def update
      {message: Message.last, conversation: Conversation.first}
    end
  end
end
