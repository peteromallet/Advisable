class Mutations::DeclineBooking < GraphQL::Schema::Mutation
  argument :id, ID, required: true
  argument :reason, String, required: true

  field :booking, Types::Booking, null: true
  field :errors, [String], null: false

  def resolve(**args)
    booking = Booking.find(args[:id])
    update_airtable_record(booking.airtable_id, args[:reason])
    booking.update_attributes(status: 'Declined', decline_reason: args[:reason])

    return {
      booking: booking,
      errors: booking.errors.full_messages
    }
  end

  private

  def update_airtable_record(id, reason)
    record = Airtable::Booking.find(id)
    record['Status'] = "Declined"
    record['Decline Reason'] = reason
    record.save
  end
end
