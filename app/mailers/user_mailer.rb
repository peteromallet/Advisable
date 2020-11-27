module DeleteThisClassHelper
  def password_link_goes_here_thomas(param)
    "http://advisable.com/delete-me"
  end
end

class UserMailer < ApplicationMailer
  helper DeleteThisClassHelper

  def confirm(uid:, token:)
    @user = User.find_by(uid: uid)
    @token = token
    mail(to: @user.account.email, subject: 'Account Confirmation')
  end

  def interview_reschedule_request(interview)
    @interview = interview
    mail(from: interview.user.sales_person.email_with_name, to: interview.user.account.email, subject: 'Interview Reschedule Request')
  end

  def invited_by_manager(manager, user)
    @manager = manager
    @user = user
    mail(to: user.account.email, subject: "#{manager.account.first_name} invited you to Advisable")
  end
end
