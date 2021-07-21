# frozen_string_literal: true

module Subscriptions
  class ReceivedMessage < Subscriptions::BaseSubscription
    description "A message was received on current_user's conversation"

    # subscription_scope :current_user_id
    field :conversation, Types::Conversation, null: false
    field :message, Types::Message, null: false

    def subscribe
      Message.last
      # return if current_user.blank?

      # Message.where(conversation: current_user.account.conversations).
      #   where.not(author: current_user.account_id).
      #   order(created_at: :asc).
      #   last
    end
  end
end
