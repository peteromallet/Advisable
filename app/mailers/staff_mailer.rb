# frozen_string_literal: true

class StaffMailer < ApplicationMailer
  def finance_csv(email, csv)
    attachments["payouts.csv"] = {mime_type: "text/csv", content: csv}
    mail(to: email, subject: "Payouts CSV", body: "Please find attached the CSV of payouts.")
  end
end
