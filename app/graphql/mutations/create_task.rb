class Mutations::CreateTask < Mutations::BaseMutation
  argument :application, ID, required: true
  argument :id, String, required: false
  argument :name, String, required: false
  argument :due_date, String, required: false
  argument :description, String, required: false

  field :task, Types::TaskType, null: true
  field :errors, [Types::Error], null: true

  def authorized?(**args)
    application = Application.find_by_airtable_id!(args[:application])
    policy = ApplicationPolicy.new(context[:current_user], application)
    return true if policy.is_specialist_or_client
    return false, { errors: [{ code: "not_authorized" }] }
  end

  def resolve(**args)
    application = Application.find_by_airtable_id!(args[:application])

    {
      task: Tasks::Create.call(
        application: application,
        attributes: args.except(:application, :id).merge({
          uid: args[:id]
        })
      )
    }

    rescue Service::Error => e
      return { errors: [e] }
  end
end
