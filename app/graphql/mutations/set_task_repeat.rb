class Mutations::SetTaskRepeat < Mutations::BaseMutation
  argument :id, ID, required: true
  argument :repeat, String, required: false

  field :task, Types::TaskType, null: true
  field :errors, [Types::Error], null: true

  def authorized?(**args)
    task = Task.find_by_uid!(args[:id])
    policy = TaskPolicy.new(context[:current_user], task)
    return true if policy.set_repeating
    return false, { errors: [{ code: "not_authorized" }] }
  end

  def resolve(**args)
    task = Task.find_by_uid!(args[:id])

    task.assign_attributes(repeat: args[:repeat])

    if task.save
      task.sync_to_airtable
      return { task: task }
    end

    return {
      errors: [{
        code: "tasks.failedToSetRepeating"
      }]
    }
  end
end