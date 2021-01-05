class Tasks::Assign < ApplicationService
  attr_reader :task, :responsible_id

  def initialize(task:, responsible_id: nil)
    @task = task
    @responsible_id = responsible_id
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

    updated = Logidze.with_responsible(responsible_id) { task.update(stage: 'Assigned', assigned_at: Time.zone.now) }

    if updated
      task.sync_to_airtable
      WebhookEvent.trigger('tasks.assigned', WebhookEvent::Task.data(task))
      return task
    end

    raise Service::Error.new(task.errors.full_messages.first)
  end
end
