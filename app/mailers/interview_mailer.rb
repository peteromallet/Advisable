# Interview related emails
class InterviewMailer < ApplicationMailer
  SCHEDULED_SUBJECT = 'Interview scheduled'
  REMINDER_SUBJECT = 'Interview reminder'
  REMINDER_BEFORE = 60.minutes

  # Email with interview call details
  #
  # @param interview [Interview]
  # @param user [User] or [Specialist] to recieve the email
  # @param participant [User] or [Specialist] who will join the call
  def scheduled(interview, user, participant)
    @interview = interview
    @user = user
    @participant = participant
    mail(to: @user.email, subject: SCHEDULED_SUBJECT)
  end

  # Email with interview call reminder details
  #
  # @param interview [Interview]
  # @param user [User] or [Specialist] to recieve the email
  # @param participant [User] or [Specialist] who will join the call
  def reminder(interview, user, participant, minutes_before = REMINDER_BEFORE)
    expected = DateTime.current + (minutes_before.minutes + 10.minutes)

    # If the interview start time changed, do nothing...
    if interview.starts_at < DateTime.current or interview.starts_at > expected
      return ActionMailer::Base::NullMail.new
    end

    @interview = interview
    @user = user
    @participant = participant
    @minutes_before = minutes_before
    mail(to: @user.email, subject: REMINDER_SUBJECT)
  end
end
