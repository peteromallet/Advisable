# frozen_string_literal: true

module Types
  class PaymentIntentType < Types::BaseType
    field :secret, String, null: false, method: :client_secret
    field :last_payment_error, Types::LastPaymentErrorType, null: true
  end
end
