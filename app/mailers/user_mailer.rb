# frozen_string_literal: true

class UserMailer < ApplicationMailer
  def confirm(uid:, token:)
    @user = User.find_by!(uid:)
    @token = token
    mail(to: @user.account.email, subject: "Account Confirmation")
  end

  def invited_by_manager(manager, user)
    @manager = manager
    @user = user
    mail(to: user.account.email, subject: "#{manager.account.first_name} invited you to Advisable")
  end

  def invited_to_interview(inviter, user, interview)
    @inviter = inviter
    @user = user
    @interview = interview
    mail(to: @user.account.email, subject: "#{@inviter.account.first_name} invited you to join their interview with #{@interview.specialist.account.name} on Advisable") do |f|
      f.html { render(layout: "email_v2") }
    end
  end

  def case_study_shared(shared_article)
    @user = shared_article.shared_with
    @shared_article = shared_article
    mail(to: @user.account.email, subject: "#{shared_article.shared_by.name} shared a case study with you: #{shared_article.article.title}")
  end

  def payment_receipt(payment)
    @payment = payment
    mail(to: payment.company.billing_email, subject: "Your payment was successful") do |f|
      f.html { render(layout: "email_v2") }
    end
  end

  def payment_invoice(payment)
    @payment = payment

    pdf = Faraday.get(payment.pdf_url)
    raise "Payment does not have a pdf" unless pdf.success?

    attachments["#{payment.uid.sub(/^pay_/, "")}-advisable-invoice.pdf"] = {mime_type: "application/pdf", content: pdf.body}
    mail(
      to: payment.company.billing_email,
      cc: "finance@advisable.com",
      subject: "Invoice from Advisable (#{payment.uid.sub(/^pay_/, "")})"
    )
  end

  def interview_reminder(interview)
    @interview = interview
    @sales_person = consultations_sales_person(interview.user&.company)
    mail(
      from: @sales_person.email_with_name,
      to: interview.user.account.email,
      bcc: [@sales_person.email_with_name, ENV.fetch("CONSULTATIONS_BCC", nil)].compact,
      subject: "Your call with #{interview.specialist.account.name} in 1 hour"
    ) do |format|
      format.html { render layout: false }
    end
  end

  def post_interview(interview)
    @interview = interview
    @account = interview.user.account
    @sales_person = interview.user&.company&.sales_person

    mail(
      from: "Advisable <hello@advisable.com>",
      to: interview.user.account.email,
      bcc: @sales_person.email_with_name,
      subject: "Do you want to continue your conversation with #{interview.specialist.account.name}?"
    ) do |format|
      format.html { render layout: "email_v2" }
    end
  end

  def new_agreement(agreement)
    agreement_mail(agreement, "#{agreement.specialist.account.name} has requested to work together on Advisable")
  end

  def agreement_reminder(agreement)
    agreement_mail(agreement, "Reminder to respond to the agreement from #{agreement.specialist.account.name}")
  end

  def payment_request(payment_request)
    payment_request_mail(payment_request, "New Payment Request")
  end

  def payment_request_reminder(payment_request)
    payment_request_mail(payment_request, "Payment Request Reminder")
  end

  def payment_request_due(payment_request)
    payment_request_mail(payment_request, "Payment Request Due")
  end

  private

  def payment_request_mail(payment_request, subject)
    @payment_request = payment_request
    @agreement = payment_request.agreement

    mail(
      subject:,
      from: "Advisable <finance@advisable.com>",
      to: @payment_request.company.billing_email,
      cc: @agreement.user.account.email,
      bcc: "finance@advisable.com"
    ) do |format|
      format.html { render layout: "email_v2" }
    end
  end

  def agreement_mail(agreement, subject)
    @agreement = agreement
    @conversation = @agreement.messages.find_by(kind: "AgreementCreated").conversation

    mail(
      to: @agreement.user.account.email,
      from: "Advisable <hello@advisable.com>",
      subject:
    ) do |format|
      format.html { render layout: "email_v2" }
    end
  end
end
