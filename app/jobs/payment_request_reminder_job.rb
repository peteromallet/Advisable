# frozen_string_literal: true

class PaymentRequestReminderJob < ApplicationJob
  REMIND_ON_DAY = 2

  def perform
    PaymentRequest.unreminded.with_status(%w[pending approved]).where(created_at: ..REMIND_ON_DAY.days.ago).find_each do |payment_request|
      payment_request.update!(reminded_at: Time.current)
      UserMailer.payment_request_reminder(payment_request).deliver_later
    end
  end
end
