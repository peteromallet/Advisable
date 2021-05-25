# frozen_string_literal: true

module Tasks
  class RequestToStart < ApplicationService
    attr_reader :task, :responsible_id

    def initialize(task:, responsible_id: nil)
      @task = task
      @responsible_id = responsible_id
    end

    def call
      raise Service::Error.new("tasks.cantRequestToStart", message: "Stage must be 'Not Assigned'") if task.stage != "Not Assigned"

      raise Service::Error, "tasks.nameRequired" if task.name.blank?

      raise Service::Error, "tasks.descriptionRequired" if task.description.blank?

      raise Service::Error.new("tasks.cantRequestToStart", message: "Application status is not 'Working'") if task.application.status != 'Working'

      updated = Logidze.with_responsible(responsible_id) { task.update(stage: "Requested To Start") }
      if updated
        task.sync_to_airtable
        return task
      end

      raise Service::Error.new("tasks.failedToSave", message: task.errors.full_messages.first)
    end
  end
end
