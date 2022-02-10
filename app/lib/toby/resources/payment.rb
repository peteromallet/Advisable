# frozen_string_literal: true

module Toby
  module Resources
    class Payment < BaseResource
      model_name ::Payment
      attribute :uid, Attributes::String, readonly: true
      attribute :task, Attributes::BelongsTo
      attribute :company, Attributes::BelongsTo
      attribute :specialist, Attributes::BelongsTo
      attribute :payment_request, Attributes::BelongsTo
      attribute :task_name, Lookups::Tasks::Name
      attribute :amount, Attributes::Currency
      attribute :admin_fee, Attributes::Currency
      attribute :amount_with_fee, Attributes::Currency, readonly: true
      attribute :vat_amount, Attributes::Currency, readonly: true
      attribute :deposit, Attributes::Currency
      attribute :total_amount_to_be_paid, Attributes::Currency, readonly: true
      attribute :status, Attributes::Select, options: ::Payment::VALID_STATUSES
      attribute :payment_method, Attributes::Select, options: ::Payment::VALID_PAYMENT_METHODS
      attribute :payment_intent_id, Attributes::String, readonly: true
      attribute :charged_at, Attributes::DateTime, readonly: true
      attribute :created_at, Attributes::DateTime, readonly: true
      attribute :updated_at, Attributes::DateTime, readonly: true

      action :mark_as_successful, label: "Mark as successful", if: ->(payment) { payment.status != "succeeded" }
      action :retry_payment, label: "Retry payment", if: ->(payment) { payment.status != "succeeded" }
      action :refund_payment, label: "Refund payment", if: ->(payment) { payment.status == "succeeded" }

      def self.mark_as_successful(object, _context)
        return if object.status == "succeeded"

        object.update!(status: "succeeded", charged_at: Time.zone.now)
        object.mark_paid!
      end

      def self.retry_payment(object, _context)
        return if object.status == "succeeded"

        object.update!(retries: object.retries + 1, payment_intent_id: nil)
        object.charge!
      end

      def self.refund_payment(object, _context)
        return unless object.status == "succeeded"

        object.refund!
      end
    end
  end
end
