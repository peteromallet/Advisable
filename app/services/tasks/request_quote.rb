class Tasks::RequestQuote < ApplicationService
  attr_reader :task

  def initialize(task:)
    @task = task
  end

  def call
    unless ["Not Assigned", "Requested To Start"].include?(task.stage)
      raise Service::Error.new("tasks.cantRequestQuote")
    end

    if task.name.blank?
      raise Service::Error.new("tasks.nameRequired")
    end

    if task.description.blank?
      raise Service::Error.new("tasks.descriptionRequired")
    end

    if task.update(stage: "Quote Requested")
      task.sync_to_airtable
      WebhookEvent.trigger("tasks.quote_requested", WebhookEvent::Task.data(task))
      return task
    end

    raise Service::Error.new(task.errors.full_messages.first)
  end
end