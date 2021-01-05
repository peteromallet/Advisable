class Tasks::RequestQuote < ApplicationService
  attr_reader :task, :responsible_id

  def initialize(task:, responsible_id: nil)
    @task = task
    @responsible_id = responsible_id
  end

  def call
    unless ['Not Assigned', 'Requested To Start'].include?(task.stage)
      raise Service::Error.new('tasks.cantRequestQuote')
    end

    raise Service::Error.new('tasks.nameRequired') if task.name.blank?

    if task.description.blank?
      raise Service::Error.new('tasks.descriptionRequired')
    end

    updated = Logidze.with_responsible(responsible_id) { task.update(stage: 'Quote Requested', quote_requested_at: Time.zone.now) }
    if updated
      task.sync_to_airtable
      WebhookEvent.trigger(
        'tasks.quote_requested',
        WebhookEvent::Task.data(task)
      )
      return task
    end

    raise Service::Error.new(task.errors.full_messages.first)
  end
end
