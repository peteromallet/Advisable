# frozen_string_literal: true

class AgreementReminderJob < ApplicationJob
  REMIND_ON_DAY = 3

  def perform
    Agreement.pending.where(created_at: ..REMIND_ON_DAY.days.ago).find_each do |agreement|
      agreement.update!(status: "reminded")
      UserMailer.agreement_reminder(agreement).deliver_later
    end
  end
end
