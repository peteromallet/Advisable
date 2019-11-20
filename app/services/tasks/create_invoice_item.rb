class Tasks::CreateInvoiceItem < ApplicationService
  attr_reader :task

  def initialize(task:)
    @task = task
  end

  def call
    if task.application.project_type != "Fixed"
      raise Service::Error.new("Can't create an invoice for a #{task.application.project_type} project")
    end

    invoice_item = Users::AddInvoiceItem.call({
      user: task.application.project.user,
      amount: (task.cost * 100).to_i,
      description: "#{task.name} + #{task.application.specialist.name}"
    })

    task.update(stripe_invoice_id: invoice_item.id)
  end
end