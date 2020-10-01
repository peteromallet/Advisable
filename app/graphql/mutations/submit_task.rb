class Mutations::SubmitTask < Mutations::BaseMutation
  argument :task, ID, required: true
  argument :final_cost, Int, required: false

  field :task, Types::TaskType, null: true
  field :errors, [Types::Error], null: true

  def authorized?(**args)
    task = Task.find_by_uid!(args[:task])
    policy = TaskPolicy.new(context[:current_user], task)
    return true if policy.is_specialist
    [false, { errors: [{ code: 'not_authorized' }] }]
  end

  def resolve(**args)
    task = Task.find_by_uid!(args[:task])

    { task: Tasks::Submit.call(task: task, final_cost: args[:final_cost]) }
  rescue Service::Error => e
    { errors: [e] }
  end
end
