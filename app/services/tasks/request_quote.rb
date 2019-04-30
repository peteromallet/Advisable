class Tasks::RequestQuote < ApplicationService
  attr_reader :task

  def initialize(task:)
    @task = task
  end

  def call
    if task.stage != "Not Assigned"
      raise Service::Error.new("tasks.cantRequestQuote")
    end

    if task.name.blank?
      raise Service::Error.new("tasks.nameRequired")
    end

    if task.description.blank?
      raise Service::Error.new("tasks.descriptionRequired")
    end

    if task.update_attributes(stage: "Quote Requested")
      task.sync_to_airtable
      WebhookEvent.trigger("tasks.quote_requested", WebhookEvent::Task.data(task))
      return task
    end

    raise Service::Error.new(task.errors.full_messages.first)
  end
end