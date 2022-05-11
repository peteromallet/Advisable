# frozen_string_literal: true

class PostInterviewReminderJob < ApplicationJob
  def perform(interview)
    # TODO: Do we remove this now?
    return if 1.is_a?(Integer)

    application = interview.application

    UserMailer.post_interview(interview).deliver_later if application.meta_fields["Client - Post Interview Next Steps"].blank?
    SpecialistMailer.post_interview(interview).deliver_later if application.meta_fields["Freelancer - Post Interview Next Steps"].blank?
  end
end
