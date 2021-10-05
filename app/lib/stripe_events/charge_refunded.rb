# frozen_string_literal: true

module StripeEvents
  class ChargeRefunded < StripeEvents::BaseEvent
    def process
      return if metadata&.payment.nil? || !intent.refunded

      payment = Payment.find_by!(uid: metadata.payment)
      payment.update(status: "refunded")
    end

    private

    def intent
      event.data.object
    end

    def metadata
      return if intent.metadata.as_json.blank?

      intent.metadata
    end
  end
end
