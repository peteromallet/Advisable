# frozen_string_literal: true

module Tasks
  class Submit < ApplicationService
    attr_reader :task, :final_cost, :responsible_id

    def initialize(task:, final_cost:, responsible_id: nil)
      super()
      @task = task
      @final_cost = final_cost
      @responsible_id = responsible_id
    end

    def call
      raise Service::Error.new('tasks.notSubmittable', message: "Application status is not 'Working'") if task.application.status != 'Working'

      raise Service::Error, 'tasks.notSubmittable' unless allowed_stages.include?(task.stage)

      updated = Logidze.with_responsible(responsible_id) { task.update(stage: 'Submitted', final_cost: final_cost, submitted_at: Time.zone.now) }
      if updated
        task.sync_to_airtable
        return task
      end

      raise Service::Error, task.errors.full_messages.first
    end

    private

    # returns an array of stages that the task can be submitted from.
    def allowed_stages
      flexible = task.application.project_type == 'Flexible'
      stages = %w[Working]
      stages << 'Not Assigned' if flexible
      stages
    end
  end
end
