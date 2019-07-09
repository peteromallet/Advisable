class Types::PaymentIntentType < Types::BaseType
  field :secret, String, null: false
  field :lastPaymentError, Types::LastPaymentErrorType, null: true

  def secret
    object.client_secret
  end
end
