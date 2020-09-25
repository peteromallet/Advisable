class Mutations::UpdateTask < Mutations::BaseMutation
  argument :id, ID, required: true
  argument :name, String, required: false
  argument :description, String, required: false
  argument :due_date, GraphQL::Types::ISO8601Date, required: false
  argument :estimate, Int, required: false
  argument :flexible_estimate, Int, required: false
  argument :trial, Boolean, required: false
  argument :estimate_type, String, required: false

  field :task, Types::TaskType, null: true
  field :errors, [Types::Error], null: true

  def authorized?(**args)
    task = Task.find_by_uid!(args[:id])
    policy = TaskPolicy.new(context[:current_user], task)
    return true if policy.is_specialist_or_client
    [false, { errors: [{ code: 'not_authorized' }] }]
  end

  def resolve(**args)
    task = Task.find_by_uid!(args[:id])

    if task.application.status === 'Stopped Working'
      raise ApiError::InvalidRequest.new(
              'applicationStatusNotWorking',
              "Application status is 'Stopped Working'"
            )
    end

    task =
      Tasks::Update.call(
        task: task, attributes: args.except(:id), user: context[:current_user]
      )

    task.application.reload

    { task: task }
  rescue Service::Error => e
    { errors: [e] }
  end
end
