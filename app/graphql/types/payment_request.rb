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

    field :admin_fee, Int, null: false
    def admin_fee
      object.payment.admin_fee
    end

    field :sourcing_fee, Int, null: false
    def sourcing_fee
      object.payout.sourcing_fee
    end
  end
end
