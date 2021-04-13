# frozen_string_literal: true

module Tasks
  class CreateInvoiceItem < ApplicationService
    attr_reader :task, :responsible_id

    def initialize(task:, responsible_id: nil)
      super()
      @task = task
      @responsible_id = responsible_id
    end

    def call
      if task.application.project_type != 'Fixed'
        raise Service::Error, "Can't create an invoice for a #{
                task.application.project_type
              } project"
      end

      invoice_item =
        if task.fixed_estimate?
          create_fixed_invoice_item
        else
          create_hourly_invoice_item
        end

      Logidze.with_responsible(responsible_id) { task.update(stripe_invoice_id: invoice_item.id) }
    end

    private

    def create_fixed_invoice_item
      Users::AddInvoiceItem.call(
        user: task.application.project.user,
        unit_amount: (task.flexible_estimate || task.estimate).ceil,
        quantity: 1,
        description: "#{task.name} + #{task.application.specialist.account.name}"
      )
    end

    def create_hourly_invoice_item
      Users::AddInvoiceItem.call(
        user: task.application.project.user,
        unit_amount: task.application.invoice_rate,
        quantity: task.invoice_hours,
        description: "#{task.name} + #{task.application.specialist.account.name}"
      )
    end
  end
end
