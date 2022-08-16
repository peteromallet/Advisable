# frozen_string_literal: true

module Types
  class InvoiceType < Types::BaseType
    field :id, ID, null: false
    field :number, String, null: false
    field :status, String, null: false
    field :amount, Int, null: false, method: :amount_due
    field :customer_name, String, null: true

    field :issued_at, GraphQL::Types::ISO8601DateTime, null: false
    def issued_at
      timestamp = object.status_transitions&.finalized_at || object.created
      Time.at(timestamp).utc.iso8601
    end

    field :due_date, GraphQL::Types::ISO8601DateTime, null: true
    def due_date
      return if object.due_date.nil?

      Time.at(object.due_date).utc.iso8601
    end

    field :customer_address, Types::AddressType, null: true
    def customer_address
      return if object.customer_address.nil?

      {
        line1: object.customer_address.line1,
        line2: object.customer_address.line2,
        city: object.customer_address.city,
        state: object.customer_address.state,
        country: object.customer_address.country,
        postcode: object.customer_address.postal_code
      }
    end

    field :description, String, null: true
    field :download_url, String, null: true, method: :invoice_pdf
    field :payment_url, String, null: true, method: :hosted_invoice_url
    field :line_items, [Types::InvoiceLineItemType], null: false, method: :lines
  end
end
