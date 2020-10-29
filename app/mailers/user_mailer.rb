class UserMailer < ApplicationMailer
  def confirm(uid:, token:)
    @user = User.find_by(uid: uid)
    @token = token
    mail(to: @user.account.email, subject: 'Account Confirmation')
  end

  def interview_reschedule_request(interview)
    @interview = interview
    mail(from: interview.user.sales_person.email_with_name, to: interview.user.account.email, subject: 'Interview Reschedule Request')
  end
end
