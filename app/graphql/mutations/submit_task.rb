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
      task = Task.find_by_uid!(args[:task])
      task = Tasks::Submit.call(task: task, final_cost: args[:final_cost], responsible_id: current_account_id)
      {task: task}
    rescue Service::Error => e
      ApiError.service_error(e)
    end
  end
end
