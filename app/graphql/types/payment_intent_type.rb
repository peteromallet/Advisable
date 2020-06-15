class Types::PaymentIntentType < Types::BaseType
  field :secret, String, null: false
  field :last_payment_error, Types::LastPaymentErrorType, null: true

  def secret
    object.client_secret
  end
end
