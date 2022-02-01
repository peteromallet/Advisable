# frozen_string_literal: true

module Types
  class Subscription < Types::BaseType
    field :name, String, null: false
    field :subscribed, Boolean, null: false
  end
end
