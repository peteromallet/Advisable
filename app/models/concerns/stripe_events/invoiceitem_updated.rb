# frozen_string_literal: true

module StripeEvents
  class InvoiceitemUpdated < StripeEvents::BaseEvent
    def process
      line_item = InvoiceLineItem.find_or_initialize_by(stripe_invoice_line_item_id: event.data.object.id)
      invoice = Invoice.find_by!(stripe_invoice_id: event.data.object.invoice)
      line_item.update!(
        invoice: invoice,
        amount: event.data.object.amount,
        name: event.data.object.description
      )
    end
  end
end
