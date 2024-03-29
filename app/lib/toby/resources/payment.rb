# frozen_string_literal: true

module Toby
  module Resources
    class Payment < BaseResource
      model_name ::Payment
      attribute :uid, Attributes::String, readonly: true
      attribute :company, Attributes::BelongsTo
      attribute :specialist, Attributes::BelongsTo
      attribute :payment_request, Attributes::BelongsTo
      attribute :amount, Attributes::Currency
      attribute :admin_fee, Attributes::Currency
      attribute :total, Attributes::Currency, readonly: true
      attribute :vat_amount, Attributes::Currency, readonly: true
      attribute :total_with_vat, Attributes::Currency, readonly: true
      attribute :status, Attributes::Select, options: ::Payment::VALID_STATUSES
      attribute :pdf_url, Attributes::Url, readonly: true
      attribute :payment_method, Attributes::Select, options: ::Payment::VALID_PAYMENT_METHODS
      attribute :payment_intent_id, Attributes::String, readonly: true
      attribute :charged_at, Attributes::DateTime, readonly: true
      attribute :created_at, Attributes::DateTime, readonly: true
      attribute :updated_at, Attributes::DateTime, readonly: true

      def self.read_pdf_url(object)
        object.pdf_url(allow_nil: true)
      end

      action :mark_as_successful, label: "Mark as successful", if: ->(payment) { !payment.paid? }
      action :retry_payment, label: "Retry payment", if: ->(payment) { !payment.paid? }
      action :refund_payment, label: "Refund payment", if: ->(payment) { payment.paid? }

      def self.mark_as_successful(object, _context)
        return if object.paid?

        object.update!(status: "succeeded", charged_at: Time.zone.now)
        object.mark_paid!
      end

      def self.retry_payment(object, _context)
        return if object.paid?

        object.update!(retries: object.retries + 1, payment_intent_id: nil)
        object.charge!
      end

      def self.refund_payment(object, _context)
        return unless object.paid?

        object.refund!
      end
    end
  end
end
