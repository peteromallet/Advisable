# frozen_string_literal: true

module Types
  class PaymentRequestLineItemInput < Types::BaseInputType
    description "Attributes for Review ratings"

    argument :amount, Integer, required: true
    argument :description, String, required: false
  end
end
