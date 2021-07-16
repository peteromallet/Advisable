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

    def process_deposit
      project = Project.find_by!(uid: metadata.project)

      project.deposit_paid += intent.amount
      project.status = "Brief Confirmed"
      project.published_at = Time.zone.now
      project.sales_status = "Open"
      project.sourcing = true
      project.save(validate: false)
      project.sync_to_airtable

      UpdateCompanysPaymentMethodJob.perform_later(project.user.company, intent.payment_method)
    end

    def process_payment
      payment = Payment.find_by!(uid: metadata.payment)
      payment.update(status: intent.status)
      UpdateCompanysPaymentMethodJob.perform_later(payment.company, intent.payment_method)
    end
  end
end
