# frozen_string_literal: true

module Types
  class InternalInvoiceLineItem < Types::BaseType
    description "Type for InvoiceLineItem model"

    field :id, ID, null: false, method: :uid
    field :stripe_invoice_line_item_id, String, null: false
    field :invoice, Types::InternalInvoice, null: false
    field :task, Types::TaskType, null: false
    field :metadata, GraphQL::Types::JSON, null: true
    field :name, String, null: true
    field :amount, Integer, null: false
  end
end
