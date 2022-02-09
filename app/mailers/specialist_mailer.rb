# frozen_string_literal: true

class SpecialistMailer < ApplicationMailer
  layout "styled_mailer"

  def confirm(uid:, token:)
    @specialist = Specialist.find_by(uid:)
    @token = token
    mail(to: @specialist.account.email, subject: "Account Confirmation")
  end

  def inform_about_project(project_id, specialist_id)
    @project = Project.find(project_id)
    @specialist = Specialist.find(specialist_id)
    return if @specialist.account.unsubscribed?("Automated Invitations")

    mail(
      to: @specialist.account.email,
      subject: "New Freelance Opportunity: #{@project.nice_name} with #{@project.industry} #{@project.company_type}"
    )
  end

  def project_paused(project, application)
    return if application.applied_at.blank?

    @project = project
    @application = application
    @sales_person = project.user.company.sales_person
    mail(
      from: @sales_person.email_with_name,
      to: @application.specialist.account.email,
      subject: "#{@project.nice_name} Project Has Been Paused"
    ) do |format|
      format.html { render layout: false }
    end
  end

  def interview_reschedule_request(interview)
    @interview = interview
    @sales_person = interview.user.company.sales_person
    mail(
      from: @sales_person.email_with_name,
      to: interview.specialist.account.email,
      subject: "Interview Reschedule Request"
    ) do |format|
      format.html { render layout: false }
    end
  end

  def more_time_options_added(interview)
    @interview = interview
    @sales_person = interview.user.company.sales_person
    mail(
      from: @sales_person.email_with_name,
      to: interview.specialist.account.email,
      subject: "More times added: Introductory call for #{interview.application.project.nice_name} Project"
    ) do |format|
      format.html { render layout: false }
    end
  end

  def interview_reminder(interview)
    @interview = interview
    @sales_person = interview.user.company.sales_person
    mail(
      from: @sales_person.email_with_name,
      to: interview.specialist.account.email,
      bcc: @sales_person.email_with_name,
      subject: "Your call with #{interview.user.account.name} in 1 hour"
    ) do |format|
      format.html { render layout: false }
    end
  end

  def first_interview_scheduled(interview)
    @interview = interview
    @user = interview.user
    @specialist = interview.specialist
    @sales_person = default_sales_person_for(@user.company)
    mail(
      from: @sales_person.email_with_name,
      to: @specialist.account.email,
      bcc: @sales_person.email_with_name,
      subject: "Prep call with Advisable"
    ) do |format|
      format.html { render layout: false }
    end
  end

  def post_interview(interview)
    @interview = interview
    @sales_person = interview.user.company.sales_person
    @account = interview.specialist.account
    mail(
      from: "Advisable <hello@advisable.com>",
      to: @account.email,
      bcc: @sales_person.email_with_name,
      subject: "What are your next steps for the #{@interview.application.project.nice_name} project with #{@interview.user.name_with_company}?"
    ) do |format|
      format.html { render(layout: "email_v2") }
    end
  end

  def consultation_request(consultation)
    @consultation = consultation
    @message = @consultation.messages.consultation_requests.order(:created_at).last
    @sales_person = default_sales_person_for(consultation.user.company)

    mail(
      from: @sales_person.email_with_name,
      to: @consultation.specialist.account.email,
      bcc: @sales_person.email_with_name,
      subject: "Consultation request from #{@consultation.user.name_with_company}"
    ) do |format|
      format.html { render layout: false }
    end
  end

  private

  def default_sales_person_for(company)
    SalesPerson.default_for_specialist || company.sales_person
  end
end
