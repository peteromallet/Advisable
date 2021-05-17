# frozen_string_literal: true

module Mutations
  class CreateTask < Mutations::BaseMutation
    argument :application, ID, required: true
    argument :description, String, required: false
    argument :due_date, GraphQL::Types::ISO8601Date, required: false
    argument :estimate, Float, required: false
    argument :estimate_type, String, required: false
    argument :flexible_estimate, Int, required: false
    argument :id, String, required: false
    argument :name, String, required: false
    argument :repeat, String, required: false

    field :task, Types::TaskType, null: true

    def authorized?(**args)
      application = Application.find_by_uid_or_airtable_id!(args[:application])
      policy = ApplicationPolicy.new(current_user, application)
      return true if policy.create?

      ApiError.not_authorized("You do not have permission to create a task")
    end

    def resolve(**args)
      application = Application.find_by_uid_or_airtable_id!(args[:application])
      task = Tasks::Create.call(
        application: application,
        attributes: args.except(:application, :id).merge({uid: args[:id]}),
        responsible_id: current_account_id
      )
      {task: task}
    rescue Service::Error => e
      ApiError.service_error(e)
    end
  end
end
