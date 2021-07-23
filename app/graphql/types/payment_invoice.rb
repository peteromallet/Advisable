# frozen_string_literal: true

module Types
  class PaymentInvoice < Types::BaseType
    description "Collection of payments in a month"

    field :id, ID, null: false
    def id
      "#{current_company.id}-#{object.year}-#{object.month}"
    end

    field :year, String, null: false
    field :month, String, null: false
    field :payments, [Types::Payment], null: false

    field :total, Int, null: false
    def total
      ::Payment.where(id: object.payments.map(&:id)).sum("amount + admin_fee")
    end
  end
end
