# frozen_string_literal: true

module Subscriptions
  class ReceivedMessage < Subscriptions::BaseSubscription
    include UserRequirements

    description "A message was received on current_account's conversation"

    subscription_scope :current_account_id
    field :message, Types::MessageInterface, null: false

    def subscribe
      :no_response
    end

    def update
      return :no_response unless object.conversation.participants.pluck(:account_id).include?(current_account_id)

      {message: object}
    end
  end
end
