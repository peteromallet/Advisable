# frozen_string_literal: true

module Mutations
  class StartTask < Mutations::BaseMutation
    description "Starts a task"
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

      ApiError.invalid_request("tasks.mustBeAssigned") if task.stage != "Assigned"
      ApiError.invalid_request("tasks.estimateRequired") if task.estimate.blank?
      ApiError.invalid_request("tasks.dueDateRequired") if task.due_date.blank?

      success = current_account_responsible_for { task.update(stage: "Working", started_working_at: Time.zone.now) }
      ApiError.invalid_request(task.errors.full_messages.first) unless success
      task.sync_to_airtable

      create_payment!(task)

      {task: task}
    end

    private

    def create_payment!(task)
      if task.fixed_estimate?
        amount = task.estimate.to_i
      else
        hours = [task.flexible_estimate, task.estimate].select { |e| e.to_i.positive? }.min
        amount = task.application.invoice_rate.to_i * hours.to_i
      end

      return unless amount.positive?

      payment = Payment.create!(company_id: task.application.project.user.company_id, specialist_id: task.application.specialist_id, amount: amount, task: task, status: "pending")
      payment.charge!
    end
  end
end
