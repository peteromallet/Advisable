# frozen_string_literal: true

class Types::SubscriptionType < GraphQL::Schema::Object
  field :new_message, subscription: Subscriptions::NewMessage
end
