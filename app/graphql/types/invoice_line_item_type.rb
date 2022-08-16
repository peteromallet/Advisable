# frozen_string_literal: true

# The underlying object for an InvoiceLineItemType is a stripe invoice line item
module Types
  class InvoiceLineItemType < Types::BaseType
    field :id, ID, null: false
    field :title, String, null: false, method: :description
    field :quantity, Int, null: false

    field :unit_price, Int, null: false
    def unit_price
      object.price&.unit_amount
    end
  end
end
