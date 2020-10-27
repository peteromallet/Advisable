class Tasks::CreateInvoiceItem < ApplicationService
  attr_reader :task

  def initialize(task:)
    @task = task
  end

  def call
    if task.application.project_type != 'Fixed'
      raise Service::Error.new(
              "Can't create an invoice for a #{
                task.application.project_type
              } project"
            )
    end

    invoice_item =
      if task.fixed_estimate?
        create_fixed_invoice_item
      else
        create_hourly_invoice_item
      end

    task.update(stripe_invoice_id: invoice_item.id)
  end

  private

  def create_fixed_invoice_item
    Users::AddInvoiceItem.call(
      {
        user: task.application.project.user,
        unit_amount: (task.flexible_estimate || task.estimate).ceil,
        quantity: 1,
        description: "#{task.name} + #{task.application.specialist.account.name}"
      }
    )
  end

  def create_hourly_invoice_item
    Users::AddInvoiceItem.call(
      {
        user: task.application.project.user,
        unit_amount: task.application.invoice_rate,
        quantity: task.invoice_hours,
        description: "#{task.name} + #{task.application.specialist.account.name}"
      }
    )
  end
end
