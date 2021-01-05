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
    requires_current_user!

    task = Task.find_by!(uid: args[:id])
    policy = TaskPolicy.new(current_user, task)
    args.except(:id).each do |arg, _val|
      next if policy.public_send("update_#{arg}")

      raise ApiError.not_authorized('You do not have access to update this task')
    end

    true
  end

  def resolve(**args)
    task = Task.find_by_uid!(args[:id])

    if task.application.status == "Stopped Working"
      raise ApiError::InvalidRequest.new("applicationStatusNotWorking", "Application status is 'Stopped Working'")
    end

    task = Tasks::Update.call(task: task, attributes: args.except(:id), user: context[:current_user], responsible_id: current_account_id)

    task.application.reload

    {task: task}
  rescue Service::Error => e
    {errors: [e]}
  end
end
