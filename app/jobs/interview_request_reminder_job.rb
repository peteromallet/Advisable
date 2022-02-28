# frozen_string_literal: true

class InterviewRequestReminderJob < ApplicationJob
  def perform
    Interview.requested.where(created_at: ..2.days.ago).each do |interview|
      next if interview.consultation

      SpecialistMailer.interview_request_reminder(interview).deliver_later
      interview.update(status: "Call Reminded")
    end
  end
end
