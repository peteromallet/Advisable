# frozen_string_literal: true

module Types
  class PaymentInvoice < Types::BaseType
    description "Collection of payments in a month"

    field :month, String, null: false
    field :payments, [Types::Payment], null: false
  end
end
