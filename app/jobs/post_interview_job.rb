# frozen_string_literal: true

class PostInterviewJob < ApplicationJob
  def perform
    Interview.scheduled.where(starts_at: (30.minutes.ago..Time.current)).each do |interview|
      interview.update(status: "Call Completed")
      next if !interview.specialist_and_user? || Agreement.exists?(specialist: interview.specialist, company: interview.user.company)

      SpecialistMailer.post_interview(interview).deliver_later
      UserMailer.post_interview(interview).deliver_later
      Notification.create!(account: interview.specialist.account, action: "send_agreement", interview:)
    end
  end
end
