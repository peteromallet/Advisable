class Tasks::Create < ApplicationService
  attr_reader :task

  def initialize(booking:, attributes:)
    @task = booking.tasks.new(attributes.merge({
      stage: "Added"
    }))
  end

  def call
    task.sync_to_airtable if task.save
    task
  end
end