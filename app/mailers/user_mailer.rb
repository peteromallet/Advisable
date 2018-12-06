class UserMailer < ApplicationMailer
  def confirm(id:)
    @user = User.find(id)
    mail(to: @user.email, subject: "Account Confirmation")
  end
end
