# frozen_string_literal: true

module Types
  class SubscriptionType < GraphQL::Schema::Object
    description "Subscription type"

    field :received_message, subscription: Subscriptions::ReceivedMessage
    field :feed_updated, subscription: Subscriptions::FeedUpdated
  end
end
