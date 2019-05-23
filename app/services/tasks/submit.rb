class Tasks::Submit < ApplicationService
  attr_reader :task, :hours_worked

  def initialize(task:, hours_worked:)
    @task = task
    @hours_worked = hours_worked
  end

  def call
    
    if task.stage != "Working"
      raise Service::Error.new("tasks.mustBeWorking")
    end
    
    if task.update_attributes(stage: "Submitted", hours_worked: hours_worked)
      task.sync_to_airtable
      WebhookEvent.trigger("tasks.submitted", WebhookEvent::Task.data(task))
      return task
    end

    raise Service::Error.new(task.errors.full_messages.first)
  end
end