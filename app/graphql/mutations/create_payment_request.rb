# frozen_string_literal: true

module Mutations
  class CreatePaymentRequest < Mutations::BaseMutation
    argument :agreement, ID, required: true
    argument :line_items, [Types::PaymentRequestLineItemInput], required: true
    argument :memo, String, required: false

    field :payment_request, Types::PaymentRequest, null: true

    def authorized?(**_args)
      requires_specialist!
    end

    def resolve(**args)
      agreement = Agreement.find_by!(uid: args[:agreement])
      ApiError.invalid_request("NO_ACTIVE_AGREEMENT_WITH_THIS_COMPANY") unless agreement.status == "accepted"

      payment_request = PaymentRequest.new(
        agreement:,
        company: agreement.company,
        specialist: current_user,
        line_items: args[:line_items],
        memo: args[:memo],
        status: "pending"
      )

      save_with_current_account!(payment_request)
      UserMailer.payment_request(payment_request).deliver_later
      conversation = Conversation.by_accounts(current_user, agreement.user)
      conversation.new_message!(kind: "PaymentRequestCreated", payment_request:, send_emails: false)

      SlackMessageJob.perform_later(channel: "payments", text: "#{payment_request.specialist.account.name} has sent a payment request to #{payment_request.company.name} (<https://advisable.com/toby/paymentrequests/#{payment_request.id}|View in Toby>)")

      {payment_request:}
    end
  end
end
