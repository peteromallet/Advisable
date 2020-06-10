# Interview related emails
class InterviewMailer < ApplicationMailer
  SCHEDULED_SUBJECT = 'Interview scheduled'
  REMINDER_SUBJECT = 'Interview reminder'

  # Email with interview call details
  #
  # @param interview [Interview]
  def scheduled(interview)
    @interview = interview
    mail(to: @user.email, subject: SCHEDULED_SUBJECT)
  end

  # Email with interview call reminder details
  #
  # @param interview [Interview]
  def reminder(interview)
    @interview = interview
    mail(to: @user.email, subject: REMINDER_SUBJECT)
  end
end
