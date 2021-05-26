# frozen_string_literal: true

module Tasks
  class RequestQuote < ApplicationService
    attr_reader :task, :responsible_id

    def initialize(task:, responsible_id: nil)
      super()
      @task = task
      @responsible_id = responsible_id
    end

    def call
      raise Service::Error, 'tasks.cantRequestQuote' unless ['Not Assigned', 'Requested To Start'].include?(task.stage)

      raise Service::Error, 'tasks.nameRequired' if task.name.blank?

      raise Service::Error, 'tasks.descriptionRequired' if task.description.blank?

      updated = Logidze.with_responsible(responsible_id) { task.update(stage: 'Quote Requested', quote_requested_at: Time.zone.now) }
      if updated
        task.sync_to_airtable
        return task
      end

      raise Service::Error, task.errors.full_messages.first
    end
  end
end
