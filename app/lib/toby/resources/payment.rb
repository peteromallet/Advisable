# frozen_string_literal: true

module Toby
  module Resources
    class Payment < BaseResource
      model_name ::Payment
      attribute :uid, Attributes::String, readonly: true
      attribute :company, Attributes::BelongsTo
      attribute :specialist, Attributes::BelongsTo
      attribute :status, Attributes::Select, options: ::Payment::VALID_STATUSES
      attribute :payment_method, Attributes::Select, options: ::Payment::VALID_PAYMENT_METHODS
      attribute :amount, Attributes::Currency
      attribute :admin_fee, Attributes::Currency
      attribute :amount_with_fee, Attributes::Currency, readonly: true
      attribute :deposit, Attributes::Currency
      attribute :task, Attributes::BelongsTo
      attribute :task_name, Lookups::Tasks::Name
      attribute :payment_intent_id, Attributes::String, readonly: true
      attribute :charged_at, Attributes::DateTime, readonly: true
      attribute :created_at, Attributes::DateTime, readonly: true
      attribute :updated_at, Attributes::DateTime, readonly: true

      action :mark_as_successful, label: "Mark as successful", if: ->(payment) { payment.status != "succeeded" }
      action :retry_payment, label: "Retry payment", if: ->(payment) { payment.status != "succeeded" }

      def self.mark_as_successful(object)
        return if object.status == "succeeded"

        object.update(status: "succeeded", charged_at: Time.zone.now)
        object.send_receipt!
      end

      def self.retry_payment(object)
        return if object.status == "succeeded"

        object.update!(retry: object.retry + 1)
        object.charge!
      end
    end
  end
end
