class Tasks::Update < ApplicationService
  attr_reader :task, :attributes, :user

  def initialize(task:, attributes:, user:)
    @task = task
    @attributes = attributes
    @user = user
  end

  def call
    task.assign_attributes(attributes.except(:trial))
    set_trial(attributes[:trial]) if attributes.key?(:trial)
    changes_allowed?

    # If the stage is "Quote Requested" and the estimate has changed then set
    # the status to "Quote Provided".
    if task.estimate_changed? && ["Quote Requested"].include?(task.stage)
      task.stage = "Quote Provided"
    end

    # If the the name, dueDate or description was changed
    if task.name_changed? or task.due_date_changed? or task.description_changed?
      # clear the estimate if the client is making the edit
      task.estimate = nil if task.estimate? && is_client?
      task.flexible_estimate = nil if task.flexible_estimate? && is_client?
      # Set the stage to Not Assigned if the task was Quote Provided
      task.stage = "Not Assigned" if task.stage == "Quote Provided"
    end

    task.sync_to_airtable if task.save

    if task.saved_change_to_stage? && task.stage == "Quote Provided"
      WebhookEvent.trigger("tasks.quote_provided", WebhookEvent::Task.data(task))
    end

    task
  end

  private

  def is_client?
    user.is_a?(User)
  end

  def is_specialist?
    user.is_a?(Specialist)
  end

  def set_trial(trial)
    existing = task.application.trial_task

    if trial == true && existing && existing != task
      task.application.trial_task.update(trial: false)
    end

    task.trial = trial
  end

  def changes_allowed?
    policy = TaskPolicy.new(user, task)

    task.changes.each do |att, changes|
      unless policy.send("update_#{att}")
        raise Service::Error.new("tasks.#{att}IsLocked")
      end
    end
  end
end
