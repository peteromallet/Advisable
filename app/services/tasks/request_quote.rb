class Tasks::RequestQuote < ApplicationService
  attr_reader :task

  def initialize(task:)
    @task = task
  end

  def call
    unless ['Not Assigned', 'Requested To Start'].include?(task.stage)
      raise Service::Error.new('tasks.cantRequestQuote')
    end

    raise Service::Error.new('tasks.nameRequired') if task.name.blank?

    if task.description.blank?
      raise Service::Error.new('tasks.descriptionRequired')
    end

    if task.update(
         stage: 'Quote Requested', quote_requested_at: Time.zone.now
       )
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
