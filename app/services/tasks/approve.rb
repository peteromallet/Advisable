class Tasks::Approve < ApplicationService
  attr_reader :task, :responsible_id

  def initialize(task:, responsible_id: nil)
    @task = task
    @responsible_id = responsible_id
  end

  def call
    if task.stage != 'Submitted'
      raise Service::Error.new('tasks.statusNotSubmitted')
    end

    updated = Logidze.with_responsible(responsible_id) { task.update(stage: 'Approved', approved_at: Time.zone.now) }
    if updated
      task.sync_to_airtable
      WebhookEvent.trigger('tasks.approved', WebhookEvent::Task.data(task))
      return task
    end

    raise Service::Error.new(task.errors.full_messages.first)
  end
end
