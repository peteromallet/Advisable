class AccountMailer < ApplicationMailer
  def reset_password(id:, token:)
    @account = Account.find(id)
    @token = token
    mail(to: @account.email, subject: 'Reset password')
  end
end
