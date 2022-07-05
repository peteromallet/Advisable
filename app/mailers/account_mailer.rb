# frozen_string_literal: true

class AccountMailer < ApplicationMailer
  def reset_password(id:, token:)
    @account = Account.find(id)
    @token = token
    mail(to: @account.email_with_name, subject: "Reset password")
  end

  def zapier_email(account, subject, body)
    mail(to: account.email_with_name, subject:) do |f|
      f.html { body }
    end
  end

  def notify_of_new_messages(account, conversation, message_ids)
    @account = account
    @conversation = conversation
    @messages = Message.where(id: message_ids).order(:created_at)
    reply_to = "#{conversation.uid}@#{ENV.fetch("MESSAGE_REPLIES_DOMAIN", nil)}"

    mail(to: @account.email_with_name, reply_to:, subject: "New messages in conversation") do |f|
      f.html { render(layout: "email_v2") }
    end
  end

  def interview_rescheduled(account, interview, rescheduler, message)
    @account = account
    @interview = interview
    @rescheduler = rescheduler
    @message = message
    @sales_person = consultations_sales_person(interview.user&.company)
    other_accounts = (@interview.accounts - [@account])
    @other_names = other_accounts.map(&:name_with_company).to_sentence
    mail(
      from: @sales_person.email_with_name,
      to: @account.email_with_name,
      bcc: @sales_person.email_with_name,
      subject: "Interview rescheduled by #{@rescheduler.name}"
    ) do |format|
      format.html { render layout: false }
    end
  end

  def interview_request(account, interview, requester, message)
    @account = account
    @interview = interview
    @requester = requester
    @message = message
    @sales_person = consultations_sales_person(interview.user&.company)
    other_accounts = (@interview.accounts - [@account, @requester])
    @participants = ["you", *other_accounts.map(&:name_with_company)].to_sentence

    mail(
      from: @sales_person.email_with_name,
      to: @account.email_with_name,
      bcc: @sales_person.email_with_name,
      subject: "Interview request from #{@requester.name_with_company}"
    ) do |format|
      format.html { render layout: false }
    end
  end

  def alternate_interview_request(account, interview, requester, reason)
    @account = account
    @interview = interview
    @requester = requester
    @reason = reason
    @sales_person = consultations_sales_person(interview.user&.company)

    mail(
      from: @sales_person.email_with_name,
      to: @account.email_with_name,
      bcc: @sales_person.email_with_name,
      subject: "Alternate interview request from #{@requester.name_with_company}"
    ) do |format|
      format.html { render layout: false }
    end
  end

  def interview_declined(account, interview, message)
    @account = account
    @message = message
    @declined_by = message.author
    @sales_person = consultations_sales_person(interview.user.company)
    @declined_by_specialist = @declined_by == interview.specialist.account

    if @declined_by_specialist
      article = interview.article || interview.specialist.articles.searchable.by_score.first
      @similar_articles = article.similar(exclude_specialist: interview.specialist.id) if article
    end

    mail(
      to: @account.email_with_name,
      from: @sales_person.email_with_name,
      bcc: @sales_person.email_with_name,
      subject: "Call Request Declined by #{@declined_by.name}"
    ) do |format|
      format.html { render layout: false }
    end
  end

  def interview_auto_declined_to_requestor(account, interview)
    @account = account
    @interview = interview
    @sales_person = consultations_sales_person(interview.user&.company)
    @other_account = (interview.accounts - [@account]).first
    @requested_by_user = interview.requested_by == interview.user.account

    if @requested_by_user
      article = interview.article || interview.specialist.articles.searchable.by_score.first
      @similar_articles = article.similar(exclude_specialist: interview.specialist.id) if article
    end

    mail(
      from: @sales_person.email_with_name,
      to: @account.email_with_name,
      bcc: @sales_person.email_with_name,
      subject: "Call Request Auto Declined: #{@other_account.name_with_company}"
    ) do |format|
      format.html { render layout: false }
    end
  end

  def interview_auto_declined_to_participant(account, interview)
    @account = account
    @interview = interview
    @sales_person = consultations_sales_person(interview.user&.company)
    @other_account = (interview.accounts - [@account]).first

    mail(
      from: @sales_person.email_with_name,
      to: @account.email_with_name,
      bcc: @sales_person.email_with_name,
      subject: "No response received for call request from #{@interview.requested_by.name_with_company}"
    ) do |format|
      format.html { render layout: false }
    end
  end
end
