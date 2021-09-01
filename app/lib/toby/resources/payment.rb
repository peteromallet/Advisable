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
      attribute :deposit, Attributes::Currency
      attribute :payment_intent_id, Attributes::String, readonly: true
      attribute :created_at, Attributes::DateTime, readonly: true
      attribute :updated_at, Attributes::DateTime, readonly: true

      action :mark_as_successful, label: "Mark as successful"

      def self.mark_as_successful(object)
        return if status == "succeeded"

        object.update(status: "succeeded")
        send_receipt!
      end
    end
  end
end
