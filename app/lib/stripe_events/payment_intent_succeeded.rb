# frozen_string_literal: true

module StripeEvents
  class PaymentIntentSucceeded < StripeEvents::BaseEvent
    def process
      return if metadata&.payment_type.nil? || !respond_to?("process_#{metadata.payment_type}", true)

      __send__("process_#{metadata.payment_type}")
    end

    private

    def intent
      event.data.object
    end

    def metadata
      return if intent.metadata.as_json.blank?

      intent.metadata
    end

    def process_payment
      payment = Payment.find_by!(uid: metadata.payment)
      payment.update(status: intent.status, charged_at: Time.zone.now)
      payment.mark_paid!
      UpdateCompanysPaymentMethodJob.perform_later(payment.company, intent.payment_method)
    end
  end
end
