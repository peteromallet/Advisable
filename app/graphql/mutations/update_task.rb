# frozen_string_literal: true

module Mutations
  class UpdateTask < Mutations::BaseMutation
    argument :description, String, required: false
    argument :due_date, GraphQL::Types::ISO8601Date, required: false
    argument :estimate, Int, required: false
    argument :estimate_type, String, required: false
    argument :flexible_estimate, Int, required: false
    argument :id, ID, required: true
    argument :name, String, required: false
    argument :trial, Boolean, required: false

    field :task, Types::TaskType, null: true

    def authorized?(**args)
      requires_current_user!

      task = Task.find_by!(uid: args[:id])
      policy = TaskPolicy.new(current_user, task)
      args.except(:id).each do |arg, _val|
        next if policy.public_send("update_#{arg}")

        ApiError.not_authorized('You do not have access to update this task')
      end

      true
    end

    def resolve(**args)
      task = Task.find_by_uid!(args[:id])

      ApiError.invalid_request("APPLICATION_STATUS_NOT_WORKING", "Application status is 'Stopped Working'") if task.application.status == "Stopped Working"

      task = Tasks::Update.call(task: task, attributes: args.except(:id), user: current_user, responsible_id: current_account_id)

      task.application.reload

      {task: task}
    rescue Service::Error => e
      ApiError.service_error(e)
    end
  end
end
