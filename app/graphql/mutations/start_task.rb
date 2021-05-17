# frozen_string_literal: true

module Mutations
  class StartTask < Mutations::BaseMutation
    argument :task, ID, required: true

    field :task, Types::TaskType, null: true

    def authorized?(**args)
      task = Task.find_by_uid!(args[:task])
      policy = TaskPolicy.new(current_user, task)
      return true if policy.start?

      ApiError.not_authorized("You do not have permission to start this task")
    end

    def resolve(**args)
      task = Task.find_by_uid!(args[:task])

      {task: Tasks::Start.call(task: task, responsible_id: current_account_id)}
    rescue Service::Error => e
      ApiError.service_error(e)
    end
  end
end
