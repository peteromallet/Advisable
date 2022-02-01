# frozen_string_literal: true

module Types
  class PaymentRequest < Types::BaseType
    description "Type for PaymentRequest model"

    def self.authorized?(payment_request, context)
      policy = PaymentRequestPolicy.new(context[:current_user], payment_request)
      ApiError.not_authorized("You do not have permission to view this payment request") unless policy.read?
      super
    end

    field :id, ID, null: false, method: :uid
    field :company, CompanyType, null: false
    field :specialist, SpecialistType, null: false
    field :status, String, null: false
    field :line_items, [Types::PaymentRequestLineItem], null: false
    field :amount, Int, null: false
    field :payment, Types::Payment, null: false
    field :cancellation_reason, String, null: true
    field :memo, String, null: true
    field :admin_fee, Int, null: false
    field :sourcing_fee, Int, null: false

    field :dispute_reason, String, null: true do
      authorize :dispute?
    end

    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
  end
end
