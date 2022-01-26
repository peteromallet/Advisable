# frozen_string_literal: true

module Mutations
  class DisputePaymentRequest < Mutations::BaseMutation
    argument :payment_request, ID, required: true

    field :payment_request, Types::PaymentRequest, null: true

    def authorized?(**args)
      payment_request = PaymentRequest.find_by!(uid: args[:payment_request])
      policy = PaymentRequestPolicy.new(current_user, payment_request)
      return true if policy.dispute?

      ApiError.not_authorized("You do not have permission to dispute this payment request")
    end

    def resolve(**args)
      payment_request = PaymentRequest.find_by!(uid: args[:payment_request])

      ApiError.invalid_request("MUST BE PENDING") if payment_request.status != "pending"

      current_account_responsible_for do
        payment_request.update(status: "disputed")
        # DO SOMETHING HERE
      end

      {payment_request:}
    end
  end
end
