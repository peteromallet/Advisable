# frozen_string_literal: true

module Mutations
  class CreatePaymentRequest < Mutations::BaseMutation
    argument :company, ID, required: true
    argument :line_items, [Types::PaymentRequestLineItemInput], required: true

    field :payment_request, Types::PaymentRequest, null: true

    def authorized?(**_args)
      requires_specialist!
    end

    def resolve(**args)
      payment_request = PaymentRequest.new(
        company: Company.find(args[:company]),
        specialist: current_user,
        line_items: args[:line_items],
        status: "pending"
      )

      save_with_current_account!(payment_request)

      {payment_request:}
    end
  end
end
