class Tasks::CreateInvoiceItem < ApplicationService
  attr_reader :task

  def initialize(task:)
    @task = task
  end

  def call
    Stripe::InvoiceItem.create({
      customer: customer_id,
      amount: amount,
      currency: "usd",
      description: "#{task.name} + #{task.application.specialist.name}"
    })
  end

  private

  def customer_id
    task.application.project.user.stripe_customer_id
  end
end