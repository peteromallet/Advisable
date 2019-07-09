class Types::PaymentMethodSetupIntentType < Types::BaseType
  field :secret, String, null: false

  def secret
    object.client_secret
  end
end
