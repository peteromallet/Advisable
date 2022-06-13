# frozen_string_literal: true

class PaymentRequestDueJob < ApplicationJob
  def perform
    PaymentRequest.not_past_due.due.with_status(%w[pending approved]).each do |payment_request|
      SlackMessageJob.perform_later(channel: "payments", text: "Payment Request for *#{payment_request.company&.name}* (#{payment_request.company_id}) with *#{payment_request.specialist&.account&.name}* (#{payment_request.specialist&.uid}) is past due date! PaymentRequest: #{payment_request.uid}")
      payment_request.update!(past_due: true)
      UserMailer.payment_request_due(payment_request).deliver_later
    end
  end
end
