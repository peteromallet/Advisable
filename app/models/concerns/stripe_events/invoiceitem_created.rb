# frozen_string_literal: true

module StripeEvents
  class InvoiceitemCreated < StripeEvents::BaseEvent
    def process
      invoice = Invoice.find_by!(stripe_invoice_id: event.data.object.invoice)
      invoice.line_items.create!(
        stripe_invoice_line_item_id: event.data.object.id,
        amount: event.data.object.amount,
        name: event.data.object.description
      )
    end
  end
end
