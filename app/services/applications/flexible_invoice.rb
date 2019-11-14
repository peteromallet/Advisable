class Applications::FlexibleInvoice < ApplicationService
  attr_reader :application

  def initialize(application:)
    @application = application
  end

  def call
    Stripe::InvoiceItem.create({
      customer: customer_id,
      amount: amount.to_i,
      currency: "usd",
      description: "50% of monthly limit + #{application.specialist.name}"
    })
  end

  private

  def customer_id
    application.project.user.stripe_customer_id
  end

  def amount
    hours = (application.monthly_limit / 2.0)
    (hours * application.rate) * 100
  end
end