# frozen_string_literal: true

module StripeEvents
  class InvoiceitemUpdated < StripeEvents::BaseEvent
    def process
      Rails.logger.debug "INVOICE ITEM UPDATED"
    end
  end
end
