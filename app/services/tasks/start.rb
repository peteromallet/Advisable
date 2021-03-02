# frozen_string_literal: true

module Tasks
  class Start < ApplicationService
    attr_reader :task, :responsible_id

    def initialize(task:, responsible_id: nil)
      super()
      @task = task
      @responsible_id = responsible_id
    end

    def call
      raise Service::Error, 'tasks.mustBeAssigned' if task.stage != 'Assigned'
      raise Service::Error, 'tasks.estimateRequired' if task.estimate.blank?
      raise Service::Error, 'tasks.dueDateRequired' if task.due_date.blank?

      updated = Logidze.with_responsible(responsible_id) { task.update(stage: 'Working', started_working_at: Time.zone.now) }
      if updated
        task.sync_to_airtable
      end

      task
    end
  end
end
