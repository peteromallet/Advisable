class Tasks::Assign < ApplicationService
  attr_reader :task

  def initialize(task:)
    @task = task
  end

  def call
    unless ["Not Assigned", "Quote Requested", "Quote Provided"].include?(task.stage)
      raise Service::Error.new("tasks.alreadyAssigned")
    end

    if task.update_attributes(stage: "Assigned")
      task.sync_to_airtable
      return task
    end

    raise Service::Error.new(task.errors.full_messages.first)
  end
end