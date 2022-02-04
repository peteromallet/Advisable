# frozen_string_literal: true

module Mutations
  class CreatePaymentRequest < Mutations::BaseMutation
    argument :company, ID, required: true
    argument :line_items, [Types::PaymentRequestLineItemInput], required: true
    argument :memo, String, required: false

    field :payment_request, Types::PaymentRequest, null: true

    def authorized?(**_args)
      requires_specialist!
    end

    def resolve(**args)
      company = Company.find(args[:company])
      ApiError.invalid_request("NO_ACTIVE_AGREEMENT_WITH_THIS_COMPANY") unless current_user.agreements.accepted.exists?(company:)

      payment_request = PaymentRequest.new(
        company:,
        specialist: current_user,
        line_items: args[:line_items],
        memo: args[:memo],
        status: "pending"
      )

      save_with_current_account!(payment_request)

      {payment_request:}
    end
  end
end
