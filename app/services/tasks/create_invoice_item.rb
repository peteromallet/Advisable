class Tasks::CreateInvoiceItem < ApplicationService
  attr_reader :task

  def initialize(task:)
    @task = task
  end

  def call
    return if task.application.project_type != "Fixed"

    invoice_item = Stripe::InvoiceItem.create({
      customer: customer_id,
      amount: amount.to_i,
      currency: "usd",
      description: "#{task.name} + #{task.application.specialist.name}"
    })

    task.update(stripe_invoice_id: invoice_item.id)
  end

  private

  def amount
    (task.estimate * task.application.rate) * 100
  end

  def customer_id
    task.application.project.user.stripe_customer_id
  end
end