# frozen_string_literal: true

module Toby
  module Resources
    class PaymentRequest < BaseResource
      model_name ::PaymentRequest
      attribute :uid, Attributes::String, readonly: true
      attribute :specialist, Attributes::BelongsTo
      attribute :company, Attributes::BelongsTo
      attribute :agreement, Attributes::BelongsTo
      attribute :status, Attributes::Select, options: ::PaymentRequest::VALID_STATUSES
      attribute :dispute_reason, Attributes::String
      attribute :cancellation_reason, Attributes::String
      attribute :line_items, Attributes::TextArray
      attribute :amount, Attributes::Currency
      attribute :payment, Attributes::HasOne
      attribute :payout, Attributes::HasOne
      attribute :due_at, Attributes::DateTime
      attribute :memo, Attributes::String
      attribute :created_at, Attributes::DateTime, readonly: true
      attribute :updated_at, Attributes::DateTime, readonly: true
    end
  end
end
