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

    field :sales_person, Types::SalesPersonType, null: true do
      authorize :read?
    end

    field :bank_transfers_enabled, Boolean, null: true do
      authorize :read?
    end

    field :users, [Types::User], null: true do
      authorize :read?
    end

    def users
      object.users.active
    end

    field :projects, [Types::ProjectType], null: true do
      authorize :read?
    end
    # Exclude any projects where the sales status is 'Lost'. We need to use an
    # or statement here otherwise SQL will also exclude records where sales_status
    # is null.
    def projects
      object.projects.where.not(sales_status: "Lost").or(
        object.projects.where(sales_status: nil)
      ).order(created_at: :desc)
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
  end
end
