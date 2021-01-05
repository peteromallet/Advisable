class Tasks::RequestToStart < ApplicationService
  attr_reader :task, :responsible_id

  def initialize(task:, responsible_id: nil)
    @task = task
    @responsible_id = responsible_id
  end

  def call
    if task.stage != "Not Assigned"
      raise Service::Error.new("tasks.cantRequestToStart", message: "Stage must be 'Not Assigned'")
    end

    if task.name.blank?
      raise Service::Error.new("tasks.nameRequired")
    end

    if task.description.blank?
      raise Service::Error.new("tasks.descriptionRequired")
    end

    if task.application.status != 'Working'
      raise Service::Error.new("tasks.cantRequestToStart", message: "Application status is not 'Working'")
    end

    updated = Logidze.with_responsible(responsible_id) { task.update(stage: "Requested To Start") }
    if updated
      task.sync_to_airtable
      WebhookEvent.trigger("tasks.requested_to_start", WebhookEvent::Task.data(task))
      return task
    end

    raise Service::Error.new("tasks.failedToSave", message: task.errors.full_messages.first)
  end
end
