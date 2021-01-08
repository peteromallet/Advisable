# frozen_string_literal: true

class StaffMailer < ApplicationMailer
  def unresponsive_specialist(report)
    @report = report
    @project = @report.application.project
    @specialist = @report.application.specialist
    @sales_person = sales_person_for(project: @project)

    mail(to: @sales_person.email_with_name, subject: "#{@specialist.account.name} is unresponsive on #{@project.name}")
  end

  private

  def sales_person_for(project:)
    project.sales_person || project.user.sales_person
  end
end
