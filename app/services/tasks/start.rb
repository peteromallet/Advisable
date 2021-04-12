class Tasks::Start < ApplicationService
  attr_reader :task, :responsible_id

  def initialize(task:, responsible_id: nil)
    @task = task
    @responsible_id = responsible_id
  end

  def call
    raise Service::Error, 'tasks.mustBeAssigned' if task.stage != 'Assigned'
    raise Service::Error, 'tasks.estimateRequired' if task.estimate.blank?
    raise Service::Error, 'tasks.dueDateRequired' if task.due_date.blank?

    updated = Logidze.with_responsible(responsible_id) { task.update(stage: 'Working', started_working_at: Time.zone.now) }
    if updated
      add_invoice_item if task.application.project_type == 'Fixed'
      task.sync_to_airtable
      WebhookEvent.trigger('tasks.started', WebhookEvent::Task.data(task))
    end

    task
  end

  private

  def add_invoice_item
    Tasks::CreateInvoiceItem.call(task: task, responsible_id: responsible_id)
  rescue Stripe::StripeError => e
    # Still log the error in sentry
    Sentry.capture_exception(e)
  end
end
