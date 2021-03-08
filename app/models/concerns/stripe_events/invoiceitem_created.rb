# frozen_string_literal: true

module StripeEvents
  class InvoiceitemCreated < StripeEvents::BaseEvent
    def process
      InvoiceitemUpdated.new(event).process
    end
  end
end
