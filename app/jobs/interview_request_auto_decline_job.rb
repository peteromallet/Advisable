# frozen_string_literal: true

class InterviewRequestAutoDeclineJob < ApplicationJob
  def perform
    Interview.reminded.where(created_at: ..4.days.ago).each do |interview|
      next if interview.consultation

      interview.messages.first&.conversation&.new_message!(kind: "InterviewAutoDeclined", interview:, send_emails: false)
      SpecialistMailer.interview_request_auto_declined(interview).deliver_later
      UserMailer.interview_request_auto_declined(interview).deliver_later
      interview.update(status: "Auto Declined")
    end
  end
end
