class UserMailerPreview < ActionMailer::Preview
  def interview_reschedule_request
    UserMailer.interview_reschedule_request(random_interview)
  end

  def interview_rescheduled
    UserMailer.interview_rescheduled(random_interview)
  end

  private

  def random_interview
    Interview.order(Arel.sql('RANDOM()')).first
  end
end
