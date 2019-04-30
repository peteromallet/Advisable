class Tasks::Submit < ApplicationService
  attr_reader :task

  def initialize(task:)
    @task = task
  end

  def call
    if task.stage != "Working"
      raise Service::Error.new("tasks.mustBeWorking")
    end

    if task.update_attributes(stage: "Submitted")
      task.sync_to_airtable
      WebhookEvent.trigger("tasks.submitted", WebhookEvent::Task.data(task))
      return task
    end

    raise Service::Error.new(task.errors.full_messages.first)
  end
end