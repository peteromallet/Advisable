# Interview related emails
class InterviewMailer < ApplicationMailer
  include ActionView::Helpers::DateHelper

  REMINDER_BEFORE = 60.minutes
  SCHEDULED_SUBJECT = 'Information before your call with %s from %s'
  REMINDER_CLIENT_SUBJECT = 'Your call with %s is in %s'
  REMINDER_SPECIALIST_SUBJECT = 'Your call with %s from %s is in %s'
  FEEDBACK_CLIENT_SUBJECT = 'Do you want to continue your conversation with %s?'
  FEEDBACK_SPECIALIST_SUBJECT = \
    'What are your next steps for the %s project with %s?'

  # Email with interview call details
  #
  # @param interview [Interview]
  def scheduled(interview)
    @interview = interview
    @user = interview.user
    @specialist = interview.specialist

    mail(
      from: format_email(@user.sales_person.name, @user.sales_person.email),
      to: format_email(@specialist.name, @specialist.email),
      reply_to: @user.sales_person.email,
      subject: SCHEDULED_SUBJECT % [@user.name, @user.company_name]
    ) do |format|
      format.html { render layout: 'mailer_basic' }
    end
  end

  # Email with interview reminder details
  #
  # @param interview [Interview]
  # @param scope [Interview] recipient for reminder (`client` or `specialist`)
  # @param should_at [Integer] unix time when email is scheduled
  def reminder(interview, scope = :specialist, should_at = 0)
    # If the interview start time changed, do nothing...
    if should_at > 0 && interview.starts_at.to_i - should_at > 10.minutes
      return ActionMailer::Base::NullMail.new
    end

    @interview = interview
    @user = interview.user
    @specialist = interview.specialist
    @minutes_before = REMINDER_BEFORE

    template_name = "interview_mailer/reminder_#{scope}"
    email = format_email(@specialist.name, @specialist.email)
    subject = REMINDER_SPECIALIST_SUBJECT % [
      @user.name,
      @user.company_name,
      time_ago_in_words(REMINDER_BEFORE.from_now)
    ]

    if scope.to_s == 'client'
      email = format_email(@user.name, @user.email)
      subject = REMINDER_CLIENT_SUBJECT % [
        @specialist.first_name,
        time_ago_in_words(REMINDER_BEFORE.from_now)
      ]
    end

    mail(
      from: format_email(@user.sales_person.name, @user.sales_person.email),
      to: email,
      subject: subject,
      bcc: @user.sales_person.email,
      reply_to: @user.sales_person.email,
    ) do |format|
      format.html {
        render(layout: 'mailer_basic', template: template_name)
      }
    end
  end

  # Email with interview feedback details
  #
  # @param interview [Interview]
  # @param scope [Interview] recipient for feedback (`client` or `specialist`)
  # @param should_at [Integer] unix time when email is scheduled
  def feedback(interview, scope = :specialist, should_at = 0)
    # If the interview start time changed, do nothing...
    if should_at > 0 && interview.starts_at.to_i - should_at > 10.minutes
      return ActionMailer::Base::NullMail.new
    end

    @interview = interview
    @user = interview.user
    @specialist = interview.specialist

    template_name = "interview_mailer/feedback_#{scope}"
    email = @specialist.email
    subject = FEEDBACK_SPECIALIST_SUBJECT % [
      @interview.application.project.primary_skill,
      @user.company_name,
    ]

    if scope.to_s == 'client'
      email = @user.email
      subject = FEEDBACK_CLIENT_SUBJECT % @specialist.name
    end

    mail(
      to: email,
      subject: subject,
      reply_to: @user.sales_person.email,
      bcc: @user.sales_person.email,
    ) do |format|
      format.html { render(template: template_name) }
    end
  end
end
