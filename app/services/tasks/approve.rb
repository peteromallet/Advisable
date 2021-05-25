# frozen_string_literal: true

module Tasks
  class Approve < ApplicationService
    attr_reader :task, :responsible_id

    def initialize(task:, responsible_id: nil)
      @task = task
      @responsible_id = responsible_id
    end

    def call
      raise Service::Error, 'tasks.statusNotSubmitted' if task.stage != 'Submitted'

      updated = Logidze.with_responsible(responsible_id) { task.update(stage: 'Approved', approved_at: Time.zone.now) }
      if updated
        task.sync_to_airtable
        return task
      end

      raise Service::Error, task.errors.full_messages.first
    end
  end
end
