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

  # TODO: Make per conversation and replace Conversation.first
  def notify_of_new_messages(account, message_ids)
    @account = account
    @messages = Message.where(id: message_ids).order(:created_at)
    reply_to = "#{Conversation.first.uid}@#{ENV["MESSAGE_REPLIES_DOMAIN"]}"

    mail(to: @account.email, reply_to: reply_to, subject: "New messages in conversation") do |f|
      f.html { render(layout: "email_v2") }
    end
  end
end
