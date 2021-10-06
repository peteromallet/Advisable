# frozen_string_literal: true

module StripeEvents
  class ChargeRefunded < StripeEvents::BaseEvent
    def process
      return if metadata&.payment.nil? || !charge.refunded

      payment = Payment.find_by!(uid: metadata.payment)
      payment.update(status: "refunded")
    end

    private

    def charge
      event.data.object
    end

    def metadata
      return if charge.metadata.as_json.blank?

      charge.metadata
    end
  end
end
