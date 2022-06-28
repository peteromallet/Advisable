# frozen_string_literal: true

class AccountMailerPreview < ActionMailer::Preview
  def zapier_email
    AccountMailer.zapier_email(random_account, "test", "<h1>test</h1><p>ha!</p>")
  end

  def notify_of_new_messages
    AccountMailer.notify_of_new_messages(
      random_account,
      random_conversation,
      random_conversation.messages.last(5).pluck(:id)
    )
  end

  def interview_rescheduled
    accounts = random_interview.accounts.order("RANDOM()").to_a
    rescheduler = accounts.pop
    AccountMailer.interview_rescheduled(accounts.sample, random_interview, rescheduler, random_message)
  end

  def interview_request
    accounts = random_interview.accounts.order("RANDOM()").to_a
    requester = accounts.pop
    AccountMailer.interview_request(accounts.sample, random_interview, requester, random_message)
  end

  def interview_declined
    AccountMailer.interview_declined(random_account, random_interview)
  end

  def interview_auto_declined_to_participant
    AccountMailer.interview_auto_declined_to_participant(random_account, random_interview)
  end

  def interview_auto_declined_to_requestor
    AccountMailer.interview_auto_declined_to_requestor(random_account, random_interview)
  end

  private

  def random_interview
    @random_interview ||= Interview.order("RANDOM()").first
  end

  def random_message
    @random_message ||= Message.order("RANDOM()").first
  end

  def random_account
    @random_account ||= Account.order("RANDOM()").first
  end

  def random_conversation
    message_conversations = Message.distinct.pluck(:conversation_id)
    @random_conversation ||= Conversation.where(id: message_conversations).order("RANDOM()").first
  end
end
