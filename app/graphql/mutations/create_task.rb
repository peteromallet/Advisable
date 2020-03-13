class Mutations::CreateTask < Mutations::BaseMutation
  argument :application, ID, required: true
  argument :id, String, required: false
  argument :name, String, required: false
  argument :description, String, required: false
  argument :dueDate, GraphQL::Types::ISO8601DateTime, required: false
  argument :estimate, Float, required: false
  argument :estimate_type, String, required: false
  argument :flexible_estimate, Int, required: false
  argument :repeat, String, required: false

  field :task, Types::TaskType, null: true
  field :errors, [Types::Error], null: true

  def authorized?(**args)
    application = Application.find_by_airtable_id!(args[:application])
    policy = ApplicationPolicy.new(context[:current_user], application)
    return true if policy.create_task
    return false, { errors: [{ code: 'not_authorized' }] }
  end

  def resolve(**args)
    application = Application.find_by_airtable_id!(args[:application])

    {
      task:
        Tasks::Create.call(
          application: application,
          attributes: args.except(:application, :id).merge({ uid: args[:id] })
        )
    }
  rescue Service::Error => e
    return { errors: [e] }
  end
end
