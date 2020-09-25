class Tasks::Assign < ApplicationService
  attr_reader :task

  def initialize(task:)
    @task = task
  end

  def call
    raise Service::Error.new('tasks.nameRequired') if task.name.blank?

    if task.description.blank?
      raise Service::Error.new('tasks.descriptionRequired')
    end

    unless [
             'Not Assigned',
             'Requested To Start',
             'Quote Requested',
             'Quote Provided'
           ].include?(task.stage)
      raise Service::Error.new('tasks.alreadyAssigned')
    end

    if task.update(stage: 'Assigned', assigned_at: Time.zone.now)
      task.sync_to_airtable
      WebhookEvent.trigger('tasks.assigned', WebhookEvent::Task.data(task))
      return task
    end

    raise Service::Error.new(task.errors.full_messages.first)
  end
end
