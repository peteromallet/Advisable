# frozen_string_literal: true

class AccountMailer < ApplicationMailer
  def reset_password(id:, token:)
    @account = Account.find(id)
    @token = token
    mail(to: @account.email, subject: 'Reset password')
  end

  def zappier_email(account, subject, body)
    mail(to: account.email, subject: subject) do |f|
      f.html { body }
    end
  end

  def notify_of_new_messages(account, message_ids)
    @account = account
    @messages = Message.where(id: message_ids).order(:created_at)
    mail(to: @account.email, subject: "New messages in conversation")
  end
end
