# frozen_string_literal: true

module StripeEvents
  class InvoiceitemDeleted < StripeEvents::BaseEvent
    def process
      Rails.logger.debug "INVOICE ITEM DELETED"
    end
  end
end
