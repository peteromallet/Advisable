class Tasks::Start < ApplicationService
  attr_reader :task

  def initialize(task:)
    @task = task
  end

  def call
    raise Service::Error.new('tasks.mustBeAssigned') if task.stage != 'Assigned'

    raise Service::Error.new('tasks.estimateRequired') if task.estimate.blank?

    raise Service::Error.new('tasks.dueDateRequired') if task.due_date.blank?

    if task.update(stage: 'Working', started_working_at: Time.zone.now)
      add_invoice_item if task.application.project_type == 'Fixed'
      task.sync_to_airtable
      WebhookEvent.trigger('tasks.started', WebhookEvent::Task.data(task))
    end

    task
  end

  private

  def add_invoice_item
    Tasks::CreateInvoiceItem.call(task: task)
  rescue Stripe::StripeError => e
    # Still log the error in sentry
    Raven.capture_exception(e)
  end
end
