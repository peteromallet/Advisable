# frozen_string_literal: true

module Mutations
  class SubmitTask < Mutations::BaseMutation
    argument :final_cost, Int, required: false
    argument :task, ID, required: true

    field :task, Types::TaskType, null: true

    def authorized?(**args)
      task = Task.find_by_uid!(args[:task])
      policy = TaskPolicy.new(current_user, task)
      ApiError.not_authorized("You do not have permission to approve this task") unless policy.submit?
      ApiError.invalid_request("TASK_NOT_SUBMITTABLE", "Application status is not 'Working'") if task.application.status != "Working"

      stages = %w[Working]
      stages << "Not Assigned" if task.application.project_type == "Flexible"
      ApiError.invalid_request("TASK_NOT_SUBMITTABLE") unless stages.include?(task.stage)

      true
    end

    def resolve(**args)
      task = Task.find_by_uid!(args[:task])
      updated = Logidze.with_responsible(current_account_id) do
        task.update(stage: "Submitted", final_cost: args[:final_cost], submitted_at: Time.zone.now)
      end
      raise ApiError.invalid_request(task.errors.full_messages.first) unless updated

      task.sync_to_airtable
      {task: task}
    end
  end
end
