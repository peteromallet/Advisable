# frozen_string_literal: true

class PostInterviewJob < ApplicationJob
  def perform
    Interview.scheduled.where(starts_at: (30.minutes.ago..Time.current)).each do |interview|
      interview.update(status: "Call Completed")
      next unless interview.specialist_and_user?

      SpecialistMailer.post_interview(interview).deliver_later
      UserMailer.post_interview(interview).deliver_later
      Notification.create!(account: interview.specialist.account, action: "send_agreement", interview:) unless Agreement.exists?(company: interview.user.company, specialist: interview.specialist)
    end
  end
end
