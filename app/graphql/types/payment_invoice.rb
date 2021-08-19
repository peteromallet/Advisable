# frozen_string_literal: true

module Types
  class PaymentInvoice < Types::BaseType
    description "Collection of payments in a month"

    field :id, ID, null: false, method: :uid
    field :year, String, null: false
    field :month, String, null: false
    field :payments, [Types::Payment], null: false
    field :pdf_url, String, null: true

    field :total, Int, null: false
    def total
      object.payments.sum(&:amount_to_be_paid)
    end
  end
end
