class Mutations::AssignTask < Mutations::BaseMutation
  argument :task, ID, required: true

  field :task, Types::TaskType, null: true
  field :errors, [Types::Error], null: true

  def authorized?(**args)
    task = Task.find_by_uid!(args[:task])
    policy = TaskPolicy.new(context[:current_user], task)
    return true if policy.is_client
    [false, { errors: [{ code: 'not_authorized' }] }]
  end

  def resolve(**args)
    task = Task.find_by_uid!(args[:task])

    user = task.application.project.user
    unless user.has_completed_tutorial?('fixedProjects')
      user.complete_tutorial('fixedProjects')
    end

    { task: Tasks::Assign.call(task: task) }
  rescue Service::Error => e
    { errors: [e] }
  end
end
