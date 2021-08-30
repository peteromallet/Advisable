# frozen_string_literal: true

class AccountMailer < ApplicationMailer
  def reset_password(id:, token:)
    @account = Account.find(id)
    @token = token
    mail(to: @account.email, subject: 'Reset password')
  end

  def zapier_email(account, subject, body)
    mail(to: account.email, subject: subject) do |f|
      f.html { body }
    end
  end

  def notify_of_new_messages(account, conversation, message_ids)
    @account = account
    @conversation = conversation
    @messages = Message.where(id: message_ids).order(:created_at)
    reply_to = "#{conversation.uid}@#{ENV["MESSAGE_REPLIES_DOMAIN"]}"

    mail(to: @account.email, reply_to: reply_to, subject: "New messages in conversation") do |f|
      f.html { render(layout: "email_v2") }
    end
  end
end
