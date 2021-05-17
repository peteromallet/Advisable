# frozen_string_literal: true

module Mutations
  class SetTaskRepeat < Mutations::BaseMutation
    argument :id, ID, required: true
    argument :repeat, String, required: false

    field :task, Types::TaskType, null: true

    def authorized?(**args)
      task = Task.find_by_uid!(args[:id])
      policy = TaskPolicy.new(current_user, task)
      return true if policy.set_repeating

      ApiError.not_authorized("You do not have permission to set repeats on this task")
    end

    def resolve(**args)
      task = Task.find_by_uid!(args[:id])
      current_account_responsible_for { task.update(repeat: args[:repeat]) }
      task.sync_to_airtable

      {task: task}
    end
  end
end
