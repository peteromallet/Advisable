# TODO: AccountMigration - pass in Account id instead of Specialist or User

class AccountMailer < ApplicationMailer
  def confirm(uid:, token:)
    @user = SpecialistOrUser.find_by_uid(uid)
    @token = token
    mail(to: @user.account.email, subject: 'Account Confirmation')
  end

  def reset_password(uid:, token:)
    @user = SpecialistOrUser.find_by_uid(uid)
    @token = token
    mail(to: @user.account.email, subject: 'Reset password')
  end
end
