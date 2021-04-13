# frozen_string_literal: true

module Users
  class AddInvoiceItem < ApplicationService
    attr_reader :user, :unit_amount, :description, :quantity

    def initialize(user:, unit_amount:, description:, quantity:)
      super()
      @user = user
      @unit_amount = unit_amount
      @description = description
      @quantity = quantity
    end

    def call
      item = Stripe::InvoiceItem.create({
        customer: stripe_customer_id,
        unit_amount: unit_amount,
        currency: 'usd',
        quantity: quantity,
        invoice: existing_invoice_id,
        description: description
      })

      create_invoice if existing_invoice_id.nil?
      item
    end

    private

    def existing_invoice_id
      @existing_invoice_id ||= begin
        invoice_list = Stripe::Invoice.list({customer: stripe_customer_id, status: 'draft'})
        invoices = invoice_list.data
        invoices.empty? ? nil : invoices.first.id
      end
    end

    def create_invoice
      Stripe::Invoice.create({
        auto_advance: false,
        days_until_due: 30,
        customer: stripe_customer_id,
        collection_method: 'send_invoice'
      })
    end

    def stripe_customer_id
      @stripe_customer_id ||= user.company.stripe_customer_id
    end
  end
end
