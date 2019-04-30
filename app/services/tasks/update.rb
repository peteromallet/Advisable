class Tasks::Update < ApplicationService
  attr_reader :task, :attributes, :user

  def initialize(task:, attributes:, user:)
    @task = task
    @attributes = attributes
    @user = user
  end

  def call
    task.assign_attributes(attributes)
    changes_allowed?

    # If the stage is "Quote Requested" and the estimate has changed then set
    # the status to "Quote Provided".
    if task.estimate_changed? && ["Quote Requested"].include?(task.stage)
      task.stage = "Quote Provided"
    end

    # If the stage is "Quote Provided" and the name, dueDate or description
    # was changed, then set the stage to "Not Assigned" and clear the estimate
    if task.stage == "Quote Provided"
      if task.name_changed? or task.due_date_changed? or task.description_changed?
        task.stage = "Not Assigned"
        task.estimate = nil
      end
    end

    task.sync_to_airtable if task.save
    task
  end

  private

  def changes_allowed?
    policy = TaskPolicy.new(user, task)

    task.changes.each do |att, changes|
      unless policy.send("update_#{att}")
        raise Service::Error.new("tasks.#{att}IsLocked")
      end
    end
  end
end