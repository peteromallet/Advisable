# frozen_string_literal: true

module Mutations
  class RequestQuote < Mutations::BaseMutation
    argument :task, ID, required: true

    field :task, Types::TaskType, null: true

    def authorized?(**args)
      task = Task.find_by_uid!(args[:task])
      policy = TaskPolicy.new(current_user, task)
      return true if policy.owned_by_user_or_company?

      ApiError.not_authorized("You do not have permission to request a quote")
    end

    def resolve(**args)
      task = Task.find_by_uid!(args[:task])

      ApiError.invalid_request("tasks.cantRequestQuote") unless ["Not Assigned", "Requested To Start"].include?(task.stage)
      ApiError.invalid_request("tasks.nameRequired") if task.name.blank?
      ApiError.invalid_request("tasks.descriptionRequired") if task.description.blank?

      task.assign_attributes(stage: "Quote Requested", quote_requested_at: Time.zone.now)
      task.save_and_sync_with_responsible!(current_account_id)

      {task: task}
    end
  end
end
