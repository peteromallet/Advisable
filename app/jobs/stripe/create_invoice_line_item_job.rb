# frozen_string_literal: true

module Stripe
  class CreateInvoiceLineItemJob < ApplicationJob
    queue_as :default

    def perform(line_item)
      return if line_item.stripe_invoice_line_item_id.present?

      attrs = {
        customer: line_item.invoice.company.stripe_customer_id,
        amount: line_item.amount,
        currency: ::InvoiceLineItem::CURRENCY,
        description: line_item.name,
        metadata: line_item.metadata
      }
      attrs[:invoice] = line_item.invoice.stripe_invoice_id if line_item.invoice.stripe_invoice_id.present?

      response = Stripe::InvoiceItem.create(attrs)
      line_item.update!(stripe_invoice_line_item_id: response.id)
      line_item.invoice.create_in_stripe! if line_item.invoice.stripe_invoice_id.blank?
    end
  end
end
