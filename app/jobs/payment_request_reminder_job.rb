# frozen_string_literal: true

class PaymentRequestReminderJob < ApplicationJob
  DAYS_TO_REMIND = [2, 4].freeze

  def perform
    PaymentRequest.with_status(%w[pending approved]).each do |payment_request|
      reminders = DAYS_TO_REMIND.map { |i| (payment_request.created_at + i.days) }.reject { |reminder| reminder > Time.current }
      reminders = reminders.map(&:to_i)
      reminders -= payment_request.reminders
      next if reminders.empty?

      payment_request.update!(reminders: payment_request.reminders + reminders)
      UserMailer.payment_request_reminder(payment_request).deliver_later
    end
  end
end
