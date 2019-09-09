class Tasks::Start < ApplicationService
  attr_reader :task

  def initialize(task:)
    @task = task
  end

  def call
    if task.stage != "Assigned"
      raise Service::Error.new("tasks.mustBeAssigned")
    end

    if task.estimate.blank?
      raise Service::Error.new("tasks.estimateRequired")
    end

    if task.due_date.blank?
      raise Service::Error.new("tasks.dueDateRequired")
    end

    if task.update(stage: "Working")
      task.sync_to_airtable
      WebhookEvent.trigger("tasks.started", WebhookEvent::Task.data(task))
      return task
    end

    raise Service::Error.new(task.errors.full_messages.first)
  end
end