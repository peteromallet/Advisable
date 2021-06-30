# frozen_string_literal: true

class UserMailer < ApplicationMailer
  def confirm(uid:, token:)
    @user = User.find_by(uid: uid)
    @token = token
    mail(to: @user.account.email, subject: "Account Confirmation")
  end

  def interview_reschedule_request(interview)
    @interview = interview
    mail(from: interview.user.company.sales_person.email_with_name, to: interview.user.account.email, subject: "Interview Reschedule Request")
  end

  def invited_by_manager(manager, user)
    @manager = manager
    @user = user
    mail(to: user.account.email, subject: "#{manager.account.first_name} invited you to Advisable")
  end

  def invited_to_review_applications(inviter, user, project, application_id: nil)
    @inviter = inviter
    @user = user
    @project = project
    @url = application_url(application_id)
    mail(to: @user.account.email, subject: "#{@inviter.account.first_name} invited you to review applications for a #{@project.try(:name)} project on Advisable")
  end

  def invited_to_interview(inviter, user, application)
    @inviter = inviter
    @user = user
    @application = application
    @project = @application.project
    @url = application_url(@application.uid)
    mail(to: @user.account.email, subject: "#{@inviter.account.first_name} invited you to join the #{@project.try(:name)} interview with #{@application.specialist.account.name} on Advisable")
  end

  def case_study_searches_refreshed(user, updated_searches)
    @user = user
    @searches = updated_searches.map do |search, articles|
      [CaseStudy::Search.find(search), CaseStudy::Article.where(id: articles)]
    end
    mail(to: @user.account.email, subject: "You Have New Recommendations") do |f|
      f.html { render(layout: "email_v2") }
    end
  end

  private

  def application_url(application_id)
    if application_id.present?
      "#{default_url_options[:host]}/projects/#{@project.uid}/candidates/#{application_id}"
    else
      "#{default_url_options[:host]}/projects/#{@project.uid}/matches"
    end
  end
end
