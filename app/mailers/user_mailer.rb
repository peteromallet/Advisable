# DEPRECATED
# The UserMailer has been deprecated in favour of AcccountMailer. This file
# has been left in place so that it can process any jobs that are already in the
# mailing queue.

class UserMailer < ApplicationMailer
  def confirm(id:, token: )
    @user = User.find(id)
    @token = token
    mail(to: @user.email, subject: "Account Confirmation")
  end

  def reset_password(id:,token:)
    @user = User.find(id)
    @token = token
    mail(to: @user.email, subject: "Reset password")
  end
end
