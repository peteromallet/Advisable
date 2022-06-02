# frozen_string_literal: true

class ApplicationMailer < ActionMailer::Base
  helper MailHelper
  default from: "Advisable <hello@advisable.com>"
  layout "mailer"

  private

  def user_sales_person(company)
    SalesPerson.default_for_user || company.sales_person
  end

  def specialist_sales_person(company)
    SalesPerson.default_for_specialist || company.sales_person
  end

  def consultations_sales_person(company)
    SalesPerson.default_for_consultations || company.sales_person
  end
end
