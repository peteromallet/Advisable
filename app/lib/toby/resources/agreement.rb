# frozen_string_literal: true

module Toby
  module Resources
    class Agreement < BaseResource
      model_name ::Agreement
      attribute :uid, Attributes::String, readonly: true
      attribute :user, Attributes::BelongsTo
      attribute :company, Attributes::BelongsTo
      attribute :specialist, Attributes::BelongsTo
      attribute :status, Attributes::Select, options: ::Agreement::VALID_STATUSES
      attribute :reason, Attributes::String
      attribute :collaboration, Attributes::Select, options: ::Agreement::VALID_COLLABORATIONS
      attribute :invoicing, Attributes::Select, options: ::Agreement::VALID_INVOICINGS
      attribute :hourly_rate, Attributes::Currency
      attribute :due_days, Attributes::Integer
      attribute :messages, Attributes::HasMany
      attribute :payment_requests, Attributes::HasMany
      attribute :updated_at, Attributes::DateTime, readonly: true
      attribute :created_at, Attributes::DateTime, readonly: true
    end
  end
end
