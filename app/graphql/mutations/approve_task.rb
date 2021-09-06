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
      task.sync_to_airtable

      if task.final_cost.to_i.positive?
        create_payout!(task)
        create_payment!(task)
      end

      {task: task}
    rescue Service::Error => e
      ApiError.service_error(e)
    end

    def create_payout!(task)
      Payout.create!(specialist_id: task.application.specialist_id, task: task, amount: task.final_cost, status: "pending")
    end

    def create_payment!(task)
      amount = task.final_cost - task.payments.sum(:amount)
      return if amount.zero?

      payment = Payment.create!(company_id: task.application.project.user.company_id, specialist_id: task.application.specialist_id, amount: amount, task: task, status: "pending")
      payment.create_in_stripe!
    end
  end
end
