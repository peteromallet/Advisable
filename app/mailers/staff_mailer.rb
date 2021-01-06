# frozen_string_literal: true

class StaffMailer < ApplicationMailer
  def unresponsive_specialist(report, unresponsive_for)
    @report = report
    @project = report.application.project
    @specialist = report.application.specialist

    mail(to: @project.sales_person.email_with_name, subject: "#{@specialist.account.name} Unresponsive on #{@project.name}")
  end
end
