class Applications::FlexibleInvoice < ApplicationService
  attr_reader :application

  def initialize(application:)
    @application = application
  end

  def call
    Users::AddInvoiceItem.call({
      user: application.project.user,
      amount: amount.to_i,
      description: "50% of monthly limit + #{application.specialist.name}"
    })
  end

  private

  def amount
    return 0 if application.rate.nil?
    hours = (application.monthly_limit / 2.0)
    (hours * application.rate) * 100
  end
end