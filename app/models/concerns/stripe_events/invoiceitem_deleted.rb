# frozen_string_literal: true

module StripeEvents
  class InvoiceitemDeleted < StripeEvents::BaseEvent
    def process
      line_item = InvoiceLineItem.find_by!(stripe_invoice_line_item_id: event.data.object.id)
      line_item.destroy!
    end
  end
end
