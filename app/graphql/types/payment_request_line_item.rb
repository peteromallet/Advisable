# frozen_string_literal: true

module Types
  class PaymentRequestLineItem < Types::BaseType
    description "Type for PaymentRequest line item"

    field :amount, Int, null: false
    field :description, String, null: false
  end
end
