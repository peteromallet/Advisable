class AccountMailer < ApplicationMailer
  # TODO: AccountMigration - move to UserMailer
  def confirm(uid:, token:)
    @user = SpecialistOrUser.find_by_uid(uid)
    @token = token
    mail(to: @user.account.email, subject: 'Account Confirmation')
  end

  def reset_password(id:, token:)
    @account = Account.find(id)
    @token = token
    mail(to: @account.email, subject: 'Reset password')
  end
end
