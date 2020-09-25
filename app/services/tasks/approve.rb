class Tasks::Approve < ApplicationService
  attr_reader :task

  def initialize(task:)
    @task = task
  end

  def call
    if task.stage != 'Submitted'
      raise Service::Error.new('tasks.statusNotSubmitted')
    end

    if task.update(stage: 'Approved', approved_at: Time.zone.now)
      task.sync_to_airtable
      WebhookEvent.trigger('tasks.approved', WebhookEvent::Task.data(task))
      return task
    end

    raise Service::Error.new(task.errors.full_messages.first)
  end
end
