# frozen_string_literal: true

module Mutations
  class AssignTask < Mutations::BaseMutation
    description "Assigns a Task"

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
      user = task.application.project.user
      user.account.complete_tutorial("fixed_projects") unless user.account.completed_tutorial?("fixed_projects")

      ApiError.invalid_request("tasks.nameRequired") if task.name.blank?
      ApiError.invalid_request("tasks.descriptionRequired") if task.description.blank?
      ApiError.invalid_request("tasks.alreadyAssigned") unless ["Not Assigned", "Requested To Start", "Quote Requested", "Quote Provided"].include?(task.stage)

      success = current_account_responsible_for { task.update(stage: "Assigned", assigned_at: Time.zone.now) }
      ApiError.invalid_request(task.errors.full_messages.first) unless success
      task.sync_to_airtable

      if task.fixed_estimate?
        amount = task.estimate.to_i
      else
        hours = [task.flexible_estimate, task.estimate].select { |e| e.to_i.positive? }.min
        amount = task.application.invoice_rate.to_i * hours.to_i
      end

      if amount.positive?
        payment = Payment.create!(company: user.company, specialist: task.application.specialist, amount: amount, task: task, status: "pending")
        payment.create_in_stripe!
      end

      {task: task}
    end
  end
end
