class Mutations::DeleteTask < Mutations::BaseMutation
  argument :task, ID, required: true

  field :task, Types::TaskType, null: true
  field :errors, [Types::Error], null: true

  def authorized?(**args)
    booking = Booking.find_by_airtable_id!(args[:booking])
    policy = BookingPolicy.new(context[:current_user], booking)
    return true if policy.is_specialist_or_client
    return false, { errors: [{ code: "not_authorized" }] }
  end

  def resolve(**args)
    task = Task.find_by_uid!(args[:task])
    task.destroy
    task.remove_from_airtable

    {
      task: task
    }

    rescue Service::Error => e
      return { errors: [e] }
  end
end
