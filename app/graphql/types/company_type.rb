# frozen_string_literal: true

module Types
  class CompanyType < Types::BaseType
    description "Type for Company model"

    field :id, ID, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
    field :name, String, null: true
    field :kind, String, null: true
    field :industry, Types::IndustryType, null: true

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
      object.projects.where.not(sales_status: 'Lost').or(
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

    def invoices
      object.payments.with_status("succeeded").group_by { |p| [p.created_at.year, p.created_at.month] }.map do |(year, month), payments|
        OpenStruct.new({year: year, month: month, payments: payments})
      end
    end

    field :invoice, Types::PaymentInvoice, null: true do
      authorize :read?
      argument :month, String, required: true
    end

    def invoice(month: nil)
      month = Date.parse(month)
      OpenStruct.new({
        month: month,
        payments: object.payments.with_status("succeeded").where(created_at: month.all_month)
      })
    end
  end
end
