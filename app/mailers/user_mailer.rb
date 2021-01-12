# frozen_string_literal: true

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

  def invited_by_manager(manager, user)
    @manager = manager
    @user = user
    mail(to: user.account.email, subject: "#{manager.account.first_name} invited you to Advisable")
  end

  def invited_to_review_applications(inviter, user, project)
    @inviter = inviter
    @user = user
    @project = project
    mail(to: user.account.email, subject: "#{inviter.account.first_name} invited you to review applications for a #{@project.try(:name)} project on Advisable")
  end
end
