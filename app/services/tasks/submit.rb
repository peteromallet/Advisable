class Tasks::Submit < ApplicationService
  attr_reader :task, :hours_worked

  def initialize(task:, hours_worked:)
    @task = task
    @hours_worked = hours_worked
  end

  def call
    unless allowed_stages.include?(task.stage)
      raise Service::Error.new("tasks.notSubmittable")
    end
    
    if task.update_attributes(stage: "Submitted", hours_worked: hours_worked)
      task.sync_to_airtable
      WebhookEvent.trigger("tasks.submitted", WebhookEvent::Task.data(task))
      return task
    end

    raise Service::Error.new(task.errors.full_messages.first)
  end

  private

  # returns an array of stages that the task can be submitted from.
  def allowed_stages
    flexible = task.application.project_type == "Flexible"
    stages = ['Working']
    stages << 'Not Assigned' if flexible
    stages
  end
end