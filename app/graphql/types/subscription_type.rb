# frozen_string_literal: true

module Types
  class SubscriptionType < GraphQL::Schema::Object
    description "Subscription type"

    field :received_message, subscription: Subscriptions::ReceivedMessage
  end
end
