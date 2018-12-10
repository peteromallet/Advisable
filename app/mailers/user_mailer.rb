class UserMailer < ApplicationMailer
  def confirm(id:)
    @user = User.find(id)
    mail(to: @user.email, subject: "Account Confirmation")
  end

  def reset_password(id:,token:)
    @user = User.find(id)
    @token = token
    mail(to: @user.email, subject: "Reset password")
  end
end
