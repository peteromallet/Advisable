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
      object.deposit_payment_intent.id
    end
  end
end
