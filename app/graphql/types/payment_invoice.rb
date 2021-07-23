# frozen_string_literal: true

module Types
  class PaymentInvoice < Types::BaseType
    description "Collection of payments in a month"

    field :id, ID, null: false
    def id
      "#{object.year}-#{object.month}-01"
    end

    field :year, String, null: false
    field :month, String, null: false
    field :payments, [Types::Payment], null: false

    field :total, Int, null: false
    def total
      object.payments.sum(&:amount_to_be_paid)
    end
  end
end
