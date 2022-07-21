# frozen_string_literal: true

class SpecialistMailer < ApplicationMailer
  layout "styled_mailer"

  def confirm(uid:, token:)
    @specialist = Specialist.find_by(uid:)
    @token = token
    mail(to: @specialist.account.email, subject: "Account Confirmation")
  end

  def interview_reminder(interview)
    @interview = interview
    @sales_person = specialist_sales_person(interview.user&.company)
    mail(
      from: @sales_person.email_with_name,
      to: interview.specialist.account.email,
      bcc: @sales_person.email_with_name,
      subject: "Your call with #{interview.user.account.name} in 1 hour"
    ) do |format|
      format.html { render layout: false }
    end
  end

  def first_interview_scheduled(interview)
    @interview = interview
    @user = interview.user
    @specialist = interview.specialist
    @sales_person = specialist_sales_person(@user.company)
    mail(
      from: @sales_person.email_with_name,
      to: @specialist.account.email,
      bcc: @sales_person.email_with_name,
      subject: "Prep call with Advisable"
    ) do |format|
      format.html { render layout: false }
    end
  end

  def post_interview(interview)
    @interview = interview
    @sales_person = specialist_sales_person(interview.user&.company)
    @account = interview.specialist.account
    mail(
      from: "Advisable <hello@advisable.com>",
      to: @account.email,
      bcc: @sales_person.email_with_name,
      subject: "What are your next steps with #{@interview.user.name_with_company}?"
    ) do |format|
      format.html { render(layout: "email_v2") }
    end
  end

  def interview_request(interview)
    @interview = interview
    @message = @interview.messages.interview_requests.order(:created_at).last
    @sales_person = specialist_sales_person(interview.user&.company)

    mail(
      from: @sales_person.email_with_name,
      to: @interview.specialist.account.email,
      bcc: @sales_person.email_with_name,
      subject: "Consultation request from #{@interview.user.name_with_company}"
    ) do |format|
      format.html { render layout: false }
    end
  end

  def interview_request_reminder(interview)
    @interview = interview
    @message = @interview.messages.interview_requests.order(:created_at).last
    @sales_person = specialist_sales_person(interview.user&.company)

    mail(
      from: @sales_person.email_with_name,
      to: @interview.specialist.account.email,
      bcc: @sales_person.email_with_name,
      subject: "Reminder for consultation request from #{@interview.user.name_with_company}"
    ) do |format|
      format.html { render layout: false }
    end
  end

  def payment_request_paid_out(payment_request)
    @payment_request = payment_request
    @account = payment_request.specialist.account
    sales_person = specialist_sales_person(payment_request.company)

    mail(
      from: "Advisable <finance@advisable.com>",
      to: @account.email,
      bcc: [sales_person.email_with_name, "Advisable <finance@advisable.com>"],
      subject: "Payment request paid out"
    ) do |format|
      format.html { render(layout: "email_v2") }
    end
  end

  def agreement_accepted(agreement)
    @agreement = agreement
    @account = agreement.specialist.account
    @sales_person = specialist_sales_person(agreement.company)

    mail(
      from: @sales_person.email_with_name,
      to: @account.email,
      bcc: @sales_person.email_with_name,
      subject: "#{agreement.company.name} has accepted your agreement"
    ) do |format|
      format.html { render(layout: "email_v2") }
    end
  end
end
