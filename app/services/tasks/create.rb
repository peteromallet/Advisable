class Tasks::Create < ApplicationService
  attr_reader :task

  def initialize(application:, attributes:)
    @task = application.tasks.new(attributes.merge({
      stage: "Added"
    }))
  end

  def call
    if task.save
      task.sync_to_airtable
      return task
    end

    raise Service::Error.new(task.errors.full_messages.first)
  end
end