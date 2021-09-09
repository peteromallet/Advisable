# frozen_string_literal: true

module Toby
  module Resources
    class Payout < BaseResource
      model_name ::Payout
      attribute :uid, Attributes::String, readonly: true
      attribute :specialist, Attributes::BelongsTo
      attribute :amount, Attributes::Currency
      attribute :sourcing_fee, Attributes::Currency
      attribute :amount_without_fee, Attributes::Currency, readonly: true
      attribute :status, Attributes::String
      attribute :task, Attributes::BelongsTo
      attribute :processed_at, Attributes::DateTime, readonly: true
      attribute :created_at, Attributes::DateTime, readonly: true
      attribute :updated_at, Attributes::DateTime, readonly: true

      action :process, label: "Mark as processed", if: ->(payout) { payout.processed_at.nil? }
      action :unprocess, label: "Mark as pending", unless: ->(payout) { payout.processed_at.nil? }

      def self.process(object)
        return if object.processed_at?

        object.update(processed_at: Time.zone.now, status: "processed")
      end

      def self.unprocess(object)
        return unless object.processed_at?

        object.update(processed_at: nil, status: "pending")
      end
    end
  end
end
