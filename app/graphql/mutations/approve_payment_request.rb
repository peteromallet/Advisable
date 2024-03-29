# frozen_string_literal: true

module Mutations
  class ApprovePaymentRequest < Mutations::BaseMutation
    argument :payment_request, ID, required: true

    field :payment_request, Types::PaymentRequest, null: false

    def authorized?(**args)
      payment_request = PaymentRequest.find_by!(uid: args[:payment_request])
      policy = PaymentRequestPolicy.new(current_user, payment_request)
      return true if policy.approve?

      ApiError.not_authorized("You do not have permission to approve this payment request")
    end

    def resolve(**args)
      payment_request = PaymentRequest.find_by!(uid: args[:payment_request])

      ApiError.invalid_request("NOT IN AN APPROVABLE STATE") unless payment_request.approvable?

      current_account_responsible_for do
        success = payment_request.update(status: "approved")
        ApiError.invalid_request(payment_request.errors.full_messages.first) unless success
        payment_request.financialize!
      end

      {payment_request:}
    end
  end
end
