# frozen_string_literal: true

module Mutations
  class ApproveTask < Mutations::BaseMutation
    argument :task, ID, required: true

    field :task, Types::TaskType, null: true

    def authorized?(**args)
      task = Task.find_by!(uid: args[:task])
      policy = TaskPolicy.new(current_user, task)
      return true if policy.owned_by_user_or_company?

      ApiError.not_authorized("You do not have permission to approve this task")
    end

    def resolve(**args)
      task = Task.find_by!(uid: args[:task])

      ApiError.invalid_request("TASK_STATUS_NOT_SUBMITTED", "Task is not in 'Sumitted' stage.") if task.stage != "Submitted"

      updated = Logidze.with_responsible(current_account_id) do
        task.update(stage: "Approved", approved_at: Time.zone.now)
      end
      ApiError.invalid_request("TASK_NOT_SAVED", task.errors.full_messages.first) unless updated

      task.create_invoice_item
      task.sync_to_airtable
      {task: task}
    end
  end
end
