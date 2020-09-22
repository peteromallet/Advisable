class SpecialistMailer < ApplicationMailer
  layout 'styled_mailer'

  def confirm(uid:, token:)
    @account = Specialist.find_by_uid(uid)
    @token = token
    mail(to: @account.email, subject: 'Account Confirmation')
  end

  def verify_project(uid)
    @project = PreviousProject.find_by_uid(uid)
    @specialist = @project.specialist

    mail(
      to: @specialist.email,
      subject:
        "Validation Required: #{@project.primary_skill.try(:name)} with #{
          @project.client_name
        }"
    )
  end

  def inform_about_project(project_id, specialist_id)
    @project = Project.find(project_id)
    @specialist = Specialist.find(specialist_id)

    mail(
      to: @specialist.email,
      subject: "We have a new opportunity that might be a good fit for you"
    )
  end
end
