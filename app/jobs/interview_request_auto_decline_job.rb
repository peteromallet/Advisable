# frozen_string_literal: true

class InterviewRequestAutoDeclineJob < ApplicationJob
  def perform
    Interview.reminded.where(created_at: ..4.days.ago).each do |interview|
      next if interview.consultation

      interview.messages.first&.conversation&.new_message!(kind: "InterviewAutoDeclined", interview:, send_emails: false)
      SpecialistMailer.interview_request_auto_declined(interview).deliver_later
      Slack.bg_message(channel: "consultation_requests", text: "The consultation request to #{interview.specialist.name} from #{interview.user.name_with_company} was auto declined.")
      # Temporarily disable this based on slack conversation
      # https://advisable.slack.com/archives/CT7JQ8RMX/p1652368647257499
      # UserMailer.interview_declined(interview, message).deliver_later
      interview.update(status: "Auto Declined")
    end
  end
end
