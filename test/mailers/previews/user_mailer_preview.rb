class UserMailerPreview < ActionMailer::Preview
  def interview_reschedule_request
    UserMailer.interview_reschedule_request(random_interview)
  end

  def invited_by_manager
    UserMailer.invited_by_manager(User.first, User.last)
  end

  private

  def random_interview
    Interview.order(Arel.sql('RANDOM()')).first
  end
end
