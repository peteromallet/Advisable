# frozen_string_literal: true

module Tasks
  class Create < ApplicationService
    attr_reader :task, :responsible_id

    def initialize(application:, attributes:, responsible_id: nil)
      @task = application.tasks.new(attributes.merge({
        stage: "Not Assigned"
      }))
      @responsible_id = responsible_id
    end

    def call
      saved = Logidze.with_responsible(responsible_id) { task.save }
      raise Service::Error, task.errors.full_messages.first unless saved

      task.sync_to_airtable
      task
    end
  end
end
