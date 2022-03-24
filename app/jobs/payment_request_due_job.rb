# frozen_string_literal: true

class PaymentRequestDueJob < ApplicationJob
  def perform
    PaymentRequest.due.with_status(%w[pending approved]).each do |payment_request|
      Slack.message(channel: "payments", text: "Payment Request for *#{payment_request.company&.name}* (#{payment_request.company_id}) with *#{payment_request.specialist&.account&.name}* (#{payment_request.specialist&.uid}) is past due date! PaymentRequest: #{payment_request.uid}")
      payment_request.update!(status: "past_due")
      UserMailer.payment_request_due(payment_request).deliver_later
    end
  end
end
