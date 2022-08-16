# frozen_string_literal: true

module Types
  class PaymentMethodType < Types::BaseType
    field :id, String, null: false
    field :name, String, null: false

    def name
      object.billing_details.name
    end

    field :last4, String, null: false

    def last4
      object.card.last4
    end

    field :brand, String, null: false

    def brand
      object.card.brand
    end

    field :exp_month, String, null: false

    def exp_month
      object.card.exp_month
    end

    field :exp_year, String, null: false

    def exp_year
      object.card.exp_year
    end
  end
end
