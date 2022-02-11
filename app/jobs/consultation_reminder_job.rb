# frozen_string_literal: true

class ConsultationReminderJob < ApplicationJob
  def perform
    Consultation.requested.where(created_at: ..2.days.ago).each do |consultation|
      SpecialistMailer.consultation_request_reminder(consultation).deliver_later
      consultation.update(status: "Request Reminded")
    end
  end
end
