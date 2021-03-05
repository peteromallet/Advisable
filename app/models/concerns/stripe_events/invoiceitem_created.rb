# frozen_string_literal: true

module StripeEvents
  class InvoiceitemCreated < StripeEvents::BaseEvent
    def process
      Rails.logger.debug "INVOICE ITEM CREATED"
    end
  end
end
