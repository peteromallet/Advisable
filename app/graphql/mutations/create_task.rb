# frozen_string_literal: true

module Mutations
  class CreateTask < Mutations::BaseMutation
    description "Create a task"

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
      application = Application.find_by!(uid: args[:application])
      policy = ApplicationPolicy.new(current_user, application)
      return true if policy.create?

      ApiError.not_authorized("You do not have permission to create a task")
    end

    def resolve(**args)
      application = Application.find_by!(uid: args[:application])

      task = application.tasks.new(args.except(:application, :id).merge({
        uid: args[:id],
        stage: "Not Assigned"
      }))

      save_with_current_account!(task)

      {task:}
    end
  end
end
