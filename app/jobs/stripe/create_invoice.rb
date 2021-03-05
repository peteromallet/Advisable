# frozen_string_literal: true

module Stripe
  class CreateInvoice < ApplicationJob
    queue_as :default

    def perform(invoice)
      return if invoice.stripe_invoice_id.present?

      response = Stripe::Invoice.create({
        auto_advance: false,
        customer: invoice.company.stripe_customer_id,
        collection_method: "send_invoice",
        days_until_due: ::Invoice::DAYS_DUE
      })
      invoice.update!(stripe_invoice_id: response.id)
    end
  end
end
