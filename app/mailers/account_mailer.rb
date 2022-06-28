# frozen_string_literal: true

class AccountMailer < ApplicationMailer
  def reset_password(id:, token:)
    @account = Account.find(id)
    @token = token
    mail(to: @account.email, subject: "Reset password")
  end

  def zapier_email(account, subject, body)
    mail(to: account.email, subject:) do |f|
      f.html { body }
    end
  end

  def notify_of_new_messages(account, conversation, message_ids)
    @account = account
    @conversation = conversation
    @messages = Message.where(id: message_ids).order(:created_at)
    reply_to = "#{conversation.uid}@#{ENV.fetch("MESSAGE_REPLIES_DOMAIN", nil)}"

    mail(to: @account.email, reply_to:, subject: "New messages in conversation") do |f|
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

  def interview_declined(interview, message)
    @message = message
    @declined_by = message.author
    @account = (interview.accounts - [@declined_by]).first
    @sales_person = consultations_sales_person(interview.user.company)
    @declined_by_specialist = @declined_by == interview.specialist.account

    if @declined_by_specialist
      article = interview.article || interview.specialist.articles.searchable.by_score.first
      @similar_articles = article.similar(exclude_specialist: interview.specialist.id) if article
    end

    mail(
      to: @account.email,
      from: @sales_person.email_with_name,
      subject: "Call Request Declined by #{@declined_by.name}"
    ) do |format|
      format.html { render layout: false }
    end
  end

  def interview_auto_declined_to_requestor(_account, interview)
    # user
    return
    @account = interview.user.account
    @specialist = interview.specialist
    @sales_person = consultations_sales_person(interview.user&.company)
    article = interview.article || @specialist.articles.searchable.by_score.first
    @similar_articles = article.similar(exclude_specialist: @specialist.id) if article

    mail(
      to: @account.email,
      from: @sales_person.email_with_name,
      subject: "Consultation Request Declined: #{@specialist.account.name}"
    ) do |format|
      format.html { render layout: false }
    end
  end

  def interview_auto_declined_to_participant(_account, interview)
    # specialist
    return
    @interview = interview
    @conversation = Conversation.by_accounts([interview.specialist.account, interview.user.account])
    @sales_person = specialist_sales_person(interview.user&.company)
    mail(
      from: @sales_person.email_with_name,
      to: interview.specialist.account.email,
      bcc: @sales_person.email_with_name,
      subject: "No response received for consultation request from #{interview.user&.company&.name}"
    ) do |format|
      format.html { render layout: false }
    end
  end
end
