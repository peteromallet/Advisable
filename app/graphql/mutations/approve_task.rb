# frozen_string_literal: true

module Mutations
  class ApproveTask < Mutations::BaseMutation
    argument :task, ID, required: true

    field :task, Types::TaskType, null: true

    def authorized?(**args)
      task = Task.find_by_uid!(args[:task])
      policy = TaskPolicy.new(current_user, task)
      return true if policy.owned_by_user_or_company?

      ApiError.not_authorized("You do not have permission to approve this task")
    end

    def resolve(**args)
      task = Task.find_by_uid!(args[:task])

      ApiError.invalid_request("tasks.statusNotSubmitted") if task.stage != "Submitted"

      success = current_account_responsible_for { task.update(stage: "Approved", approved_at: Time.zone.now) }
      ApiError.invalid_request(task.errors.full_messages.first) unless success
      task.charge!

      {task: task}
    end
  end
end
