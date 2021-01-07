# frozen_string_literal: true

class StaffMailer < ApplicationMailer
  def unresponsive_specialist(report)
    @report = report
    @project = report.application.project
    @specialist = report.application.specialist
    @sales_person = @project.sales_person || @project.user.sales_person

    mail(to: @sales_person.email_with_name, subject: "#{@specialist.account.name} is unresponsive on #{@project.name}")
  end
end
