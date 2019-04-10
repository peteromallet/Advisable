class Mutations::AcceptProposal < Mutations::BaseMutation
  argument :id, ID, required: true
  field :booking, Types::Booking, null: true
  field :errors, [Types::Error], null: true

  def authorized?(id:)
    booking = Booking.find_by_airtable_id!(id)
    policy = BookingPolicy.new(context[:current_user], booking)
    return true if policy.is_client
    return false, { errors: [{ code: "not_authorized" }] }
  end

  def resolve(id:)
    booking = Booking.find_by_airtable_id!(id)

    {
      booking: Proposals::Accept.call(booking: booking)
    }

    rescue Service::Error => e
      return { errors: [e] }
  end
end