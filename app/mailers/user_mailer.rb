class UserMailer < ApplicationMailer
  def interview_reschedule_request(interview)
    @interview = interview
    mail(from: interview.user.sales_person.email_with_name, to: interview.user.email, subject: 'Interview Reschedule Request')
  end
end
