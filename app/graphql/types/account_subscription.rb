# frozen_string_literal: true

module Types
  class AccountSubscription < Types::BaseType
    field :name, String, null: false
    field :subscribed, Boolean, null: false
  end
end
