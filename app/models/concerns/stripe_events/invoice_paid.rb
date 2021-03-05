# frozen_string_literal: true

module StripeEvents
  class InvoicePaid < StripeEvents::BaseEvent
    def process
      invoice = Invoice.find_by!(stripe_invoice_id: event.data.object.id)
      invoice.update!(
        status: event.data.object.status,
        paid_at: Time.zone.at(event.data.object.status_transitions.paid_at)
      )
    end
  end
end
