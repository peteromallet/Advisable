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
end
