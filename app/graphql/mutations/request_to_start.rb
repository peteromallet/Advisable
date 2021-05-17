# frozen_string_literal: true

module Mutations
  class RequestToStart < Mutations::BaseMutation
    argument :task, ID, required: true

    field :task, Types::TaskType, null: true

    def authorized?(**args)
      task = Task.find_by_uid!(args[:task])
      policy = TaskPolicy.new(current_user, task)

      return true if policy.request_to_start?

      ApiError.not_authorized("You do not have permission to request to start")
    end

    def resolve(**args)
      task = Task.find_by_uid!(args[:task])
      task = Tasks::RequestToStart.call(task: task, responsible_id: current_account_id)
      {task: task}
    rescue Service::Error => e
      ApiError.service_error(e)
    end
  end
end
