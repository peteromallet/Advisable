# frozen_string_literal: true

module Tasks
  class Update < ApplicationService
    attr_reader :task, :attributes, :user, :responsible_id

    def initialize(task:, attributes:, user:, responsible_id: nil)
      super()
      @task = task
      @attributes = attributes
      @user = user
      @responsible_id = responsible_id
    end

    def call
      task.assign_attributes(attributes.except(:trial))
      set_trial(attributes[:trial]) if attributes.key?(:trial)
      changes_allowed?

      # If the stage is "Quote Requested" and the estimate has changed then set
      # the status to "Quote Provided".
      if task.estimate_changed? && ['Quote Requested'].include?(task.stage)
        task.stage = 'Quote Provided'
        task.quote_provided_at = Time.zone.now
      end

      # If the the name, dueDate or description was changed

      # clear the estimate if the client is making the edit

      # Set the stage to Not Assigned if the task was Quote Provided

      if task.name_changed? || task.due_date_changed? || task.description_changed?
        task.estimate = nil if task.estimate? && is_client?
        task.flexible_estimate = nil if task.flexible_estimate? && is_client?

        task.stage = 'Not Assigned' if task.stage == 'Quote Provided'
      end

      task.sync_to_airtable if Logidze.with_responsible(responsible_id) { task.save }

      task
    end

    private

    def is_client? # rubocop:disable Naming/PredicateName
      user.is_a?(::User)
    end

    def set_trial(trial) # rubocop:disable Naming/AccessorMethodName
      existing = task.application.trial_task

      if existing.present? &&
         existing.stage.in?(%w[Assigned Working Submitted Approved Paid])
        raise Service::Error, 'tasks.applicationHasActiveTrialTask'
      end

      if trial == true && existing && existing != task
        existing.update(trial: false)
        existing.sync_to_airtable
      end

      task.trial = trial
    end

    def changes_allowed?
      policy = TaskPolicy.new(user, task)

      task.changes.each do |att, _changes|
        raise Service::Error, "tasks.#{att}IsLocked" unless policy.public_send("update_#{att}")
      end
    end
  end
end
