# frozen_string_literal: true

class StaffMailer < ApplicationMailer
  def unresponsive_specialist(report)
    instance_variables_for_unresponsiveness_report(report)

    mail(to: @sales_person.email_with_name, subject: "#{@specialist.account.name} is unresponsive on #{@project.name}")
  end

  def unresponsive_client(report)
    instance_variables_for_unresponsiveness_report(report)

    mail(to: @sales_person.email_with_name, subject: "#{@client.account.name} is unresponsive on #{@project.name}")
  end

  def problematic_specialist(flag)
    @flag = flag
    @project = @flag.application.project
    @user = @flag.user
    @specialist = @flag.application.specialist
    @sales_person = @project.user.company.sales_person

    mail(to: @sales_person.email_with_name, subject: "#{@user.account.name} reported #{@specialist.account.name} as problematic on #{@project.name}")
  end

  def finance_csv(email, csv)
    attachments["payouts.csv"] = {mime_type: "text/csv", content: csv}
    mail(to: email, subject: "Payouts CSV", body: "Please find attached the CSV of payouts.")
  end

  private

  def instance_variables_for_unresponsiveness_report(report)
    @report = report
    @application = @report.application
    @project = @application.project
    @specialist = @application.specialist
    @client = @project.user
    @sales_person = @project.user.company.sales_person
  end
end
