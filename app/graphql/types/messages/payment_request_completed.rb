# frozen_string_literal: true

module Types
  module Messages
    class PaymentRequestCompleted < Types::BaseType
      implements Types::MessageInterface

      field :payment_request, Types::PaymentRequest, null: false
    end
  end
end
