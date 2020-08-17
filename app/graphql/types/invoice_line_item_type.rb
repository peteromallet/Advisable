# The underlying object for an InvoiceLineItemType is a stripe invoice line item
class Types::InvoiceLineItemType < Types::BaseType
  field :id, ID, null: false
  field :title, String, null: false
  field :quantity, Int, null: false
  field :unit_price, Int, null: false

  def title
    object.description
  end

  def unit_price
    object.amount
  end
end
