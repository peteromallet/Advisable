# frozen_string_literal: true

class InterviewReminderJob < ApplicationJob
  def perform
    redis = Redis.current

    Interview.where(starts_at: (Time.current..1.hour.from_now)).each do |interview|
      sent_for = redis.get("interview_reminder_for_#{interview.id}").to_i
      next if sent_for.present? && interview.starts_at.to_i == sent_for

      SpecialistMailer.interview_reminder(interview).deliver_later
      UserMailer.interview_reminder(interview).deliver_later
      redis.set("interview_reminder_for_#{interview.id}", interview.starts_at.to_i)
    end
  end
end
