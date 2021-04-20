# frozen_string_literal: true

module Mutations
  class AssignTask < Mutations::BaseMutation
    argument :task, ID, required: true

    field :task, Types::TaskType, null: true

    def authorized?(**args)
      task = Task.find_by_uid!(args[:task])
      policy = TaskPolicy.new(context[:current_user], task)
      return true if policy.owned_by_user_or_company?

      ApiError.not_authorized("You do not have permission to approve this task")
    end

    def resolve(**args)
      task = Task.find_by_uid!(args[:task])

      user = task.application.project.user
      user.account.complete_tutorial('fixed_projects') unless user.account.completed_tutorial?('fixed_projects')

      {task: Tasks::Assign.call(task: task, responsible_id: current_account_id)}
    rescue Service::Error => e
      ApiError.service_error(e)
    end
  end
end
