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
      task = Task.find_by!(uid: args[:task])

      ApiError.invalid_request("tasks.cantRequestToStart", "Stage must be 'Not Assigned'") if task.stage != "Not Assigned"
      ApiError.invalid_request("tasks.nameRequired") if task.name.blank?
      ApiError.invalid_request("tasks.descriptionRequired") if task.description.blank?
      ApiError.invalid_request("tasks.cantRequestToStart", "Application status is not 'Working'") if task.application.status != "Working"

      task.stage = "Requested To Start"
      task.save_and_sync_with_responsible!(current_account_id)

      {task: task}
    end
  end
end
