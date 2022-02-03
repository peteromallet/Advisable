# frozen_string_literal: true

module Mutations
  class CancelPaymentRequest < Mutations::BaseMutation
    argument :payment_request, ID, required: true
    argument :reason, String, required: true

    field :payment_request, Types::PaymentRequest, null: true

    def authorized?(**args)
      payment_request = PaymentRequest.find_by!(uid: args[:payment_request])
      policy = PaymentRequestPolicy.new(current_user, payment_request)
      return true if policy.cancel?

      ApiError.not_authorized("You do not have permission to cancel this payment request")
    end

    def resolve(**args)
      payment_request = PaymentRequest.find_by!(uid: args[:payment_request])

      ApiError.invalid_request("MUST BE PENDING OR DISPUTED") if %w[pending disputed].exclude?(payment_request.status)

      current_account_responsible_for do
        payment_request.update(status: "canceled", cancellation_reason: args[:reason])
      end

      {payment_request:}
    end
  end
end
