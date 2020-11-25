module Types
  class DepositType < Types::BaseType
    field :paid, Boolean, null: true
    field :amount, Integer, null: true
    field :payment_intent, String, null: true

    def paid
      object.deposit_is_paid
    end

    def amount
      object.deposit
    end

    def payment_intent
      return nil if object.deposit_owed < 1

      object.deposit_payment_intent.client_secret
    end
  end
end
