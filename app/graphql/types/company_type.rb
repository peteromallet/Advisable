# frozen_string_literal: true

module Types
  class CompanyType < Types::BaseType
    description "Type for Company model"

    field :id, ID, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
    field :name, String, null: true
    field :kind, String, null: true
    field :business_type, String, null: true
    field :industry, Types::IndustryType, null: true
    field :address, Types::AddressType, null: true
    field :invoice_company_name, String, null: true
    field :vat_number, String, null: true
    field :apply_vat, Boolean, null: true, method: :apply_vat?
    field :payment_method, String, null: true, method: :project_payment_method

    field :sales_person, Types::SalesPersonType, null: true do
      authorize :read?
    end

    field :users, [Types::User], null: true do
      authorize :read?
    end

    def users
      object.users.active
    end

    field :payments, Types::Payment.connection_type, null: true do
      authorize :read?
      argument :status, String, required: false
    end

    def payments(status: nil)
      payments = object.payments
      payments = payments.with_status(status) if status.present?
      payments
    end

    field :invoices, Types::PaymentInvoice.connection_type, null: true do
      authorize :read?
    end

    field :invoice, Types::PaymentInvoice, null: true do
      authorize :read?
      argument :id, ID, required: true
    end

    def invoice(id:)
      object.invoices.find_by!(uid: id)
    end

    field :candidates, Types::ApplicationType.connection_type, null: false do
      description <<~GRAPHQL
        Returns applications that are in hireable state. i.e the client has
        requested a consultation with them.
      GRAPHQL
    end

    def candidates
      object.applications.active
    end

    field :invoice_settings, Types::InvoiceSettingsType do
      authorize :read?
    end
  end
end
