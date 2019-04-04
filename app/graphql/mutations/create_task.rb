class Mutations::CreateTask < Mutations::BaseMutation
  argument :booking, ID, required: true
  argument :name, String, required: false
  argument :due_date, String, required: false
  argument :description, String, required: false

  field :task, Types::TaskType, null: true
  field :errors, [Types::Error], null: true

  def authorized?(**args)
    booking = Booking.find_by_airtable_id!(args[:booking])
    policy = BookingPolicy.new(context[:current_user], booking)
    return true if policy.is_specialist_or_client
    return false, { errors: [{ code: "not_authorized" }] }
  end

  def resolve(**args)
    booking = Booking.find_by_airtable_id!(args[:booking])

    {
      task: Tasks::Create.call(
        booking: booking,
        attributes: args.except(:booking)
      )
    }

    rescue Service::Error => e
      return { errors: [e] }
  end
end
