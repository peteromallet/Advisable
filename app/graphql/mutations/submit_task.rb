# frozen_string_literal: true

module Mutations
  class SubmitTask < Mutations::BaseMutation
    argument :final_cost, Int, required: false
    argument :task, ID, required: true

    field :task, Types::TaskType, null: true

    def authorized?(**args)
      task = Task.find_by_uid!(args[:task])
      policy = TaskPolicy.new(current_user, task)
      return true if policy.submit?

      ApiError.not_authorized("You do not have permission to approve this task")
    end

    def resolve(**args)
      task = Task.find_by!(uid: args[:task])

      ApiError.invalid_request("tasks.notSubmittable", "Application status is not 'Working'") if task.application.status != "Working"
      ApiError.invalid_request("tasks.notSubmittable") unless allowed_stages(task).include?(task.stage)

      task.assign_attributes(stage: "Submitted", final_cost: args[:final_cost], submitted_at: Time.zone.now)
      task.save_and_sync_with_responsible!(current_account_id)

      {task: task}
    end

    private

    def allowed_stages(task)
      stages = %w[Working]
      stages << "Not Assigned" if task.application.project_type == "Flexible"
      stages
    end
  end
end
