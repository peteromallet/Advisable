# frozen_string_literal: true

class UserMailerPreview < ActionMailer::Preview
  def interview_reschedule_request
    UserMailer.interview_reschedule_request(random_interview)
  end

  def invited_by_manager
    UserMailer.invited_by_manager(User.first, User.last)
  end

  def invited_to_review_applications
    UserMailer.invited_to_review_applications(User.first, User.last, random_project)
  end

  def invited_to_review_applications_with_application
    application = random_application
    UserMailer.invited_to_review_applications(User.first, User.last, application.project, application_id: application.uid)
  end

  private

  def random_interview
    Interview.order(Arel.sql('RANDOM()')).first
  end

  def random_project
    Project.order(Arel.sql('RANDOM()')).first
  end

  def random_application
    Application.order(Arel.sql('RANDOM()')).first
  end
end
