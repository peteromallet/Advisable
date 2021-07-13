# frozen_string_literal: true

module StripeEvents
  class PaymentIntentSucceeded < StripeEvents::BaseEvent
    def process
      return unless metadata.payment_type

      __send__("process_#{metadata.payment_type}")
    end

    private

    def intent
      event.data.object
    end

    def metadata
      intent.metadata
    end

    def process_deposit
      project = Project.find_by!(uid: metadata.project)

      project.deposit_paid += intent.amount
      project.status = "Brief Confirmed"
      project.published_at = Time.zone.now
      project.sales_status = "Open"
      project.sourcing = true
      project.save(validate: false)
      project.sync_to_airtable

      # Attach the payment method
      Users::AttachPaymentMethod.call(
        user: project.user,
        payment_method_id: intent.payment_method
      )
    end

    def process_payment
      payment = Payment.find_by!(uid: metadata.payment)
      payment.update(status: intent.status)
    end
  end
end
