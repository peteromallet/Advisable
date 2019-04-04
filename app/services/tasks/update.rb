class Tasks::Update < ApplicationService
  attr_reader :task, :attributes

  def initialize(task:, attributes:)
    @task = task
    @attributes = attributes
  end

  def call
    task.assign_attributes(attributes)
    task.sync_to_airtable if task.save
    task
  end
end