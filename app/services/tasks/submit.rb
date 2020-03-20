class Tasks::Submit < ApplicationService
  attr_reader :task, :final_cost

  def initialize(task:, final_cost:)
    @task = task
    @final_cost = final_cost
  end

  def call
    if task.application.status != 'Working'
      raise Service::Error.new(
              'tasks.notSubmittable',
              message: "Application status is not 'Working'"
            )
    end

    unless allowed_stages.include?(task.stage)
      raise Service::Error.new('tasks.notSubmittable')
    end

    if task.update(
         stage: 'Submitted',
         final_cost: final_cost,
         submitted_at: DateTime.now.utc
       )
      task.sync_to_airtable
      WebhookEvent.trigger('tasks.submitted', WebhookEvent::Task.data(task))
      return task
    end

    raise Service::Error.new(task.errors.full_messages.first)
  end

  private

  # returns an array of stages that the task can be submitted from.
  def allowed_stages
    flexible = task.application.project_type == 'Flexible'
    stages = %w[Working]
    stages << 'Not Assigned' if flexible
    stages
  end
end
