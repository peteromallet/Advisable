# frozen_string_literal: true

module Mutations
  class DeleteTask < Mutations::BaseMutation
    argument :task, ID, required: true

    field :task, Types::TaskType, null: true

    def authorized?(**_args)
      requires_current_user!
    end

    def resolve(**args)
      task = Task.find_by_uid!(args[:task])
      policy = TaskPolicy.new(current_user, task)
      ApiError.invalid_request("tasks.cantDeleteAssigned") unless policy.delete

      task.stage = "Deleted"
      task.save_and_sync_with_responsible!(current_account_id)

      {task: task}
    end
  end
end
