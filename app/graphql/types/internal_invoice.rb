# frozen_string_literal: true

module Types
  class InternalInvoice < Types::BaseType
    description "Type for Invoice model"

    field :id, ID, null: false, method: :uid
    field :stripe_invoice_id, String, null: false
    field :status, String, null: false
    field :line_items, [Types::InternalInvoiceLineItem], null: true
    field :company, Types::CompanyType, null: true
    field :application, Types::ApplicationType, null: true
    field :exported_at, GraphQL::Types::ISO8601DateTime, null: true
    field :paid_at, GraphQL::Types::ISO8601DateTime, null: true
    field :paid_out_at, GraphQL::Types::ISO8601DateTime, null: true
    field :period_end, GraphQL::Types::ISO8601DateTime, null: true
    field :period_start, GraphQL::Types::ISO8601DateTime, null: true
  end
end
