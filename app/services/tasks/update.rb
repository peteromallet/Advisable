class Tasks::Update < ApplicationService
  attr_reader :task, :attributes

  def initialize(task:, attributes:)
    @task = task
    @attributes = attributes
  end

  def call
    task.assign_attributes(attributes)

    # If the stage is "Quote Requested" and the estimate has changed then set
    # the status to "Quote Provided".
    if task.estimate_changed? && task.stage == "Quote Requested"
      task.stage = "Quote Provided"
    end

    task.sync_to_airtable if task.save
    task
  end
end