class Mutations::AcceptBooking < GraphQL::Schema::Mutation
  argument :id, ID, required: true

  field :booking, Types::Booking, null: true
  field :errors, [String], null: false

  def resolve(**args)
    booking = Booking.find(args[:id])
    update_airtable_record(booking.airtable_id)
    booking.update_attributes(status: 'Accepted')
    Webhook.process(booking)

    return {
      booking: booking,
      errors: booking.errors.full_messages
    }
  end

  private

  def update_airtable_record(id)
    record = Airtable::Booking.find(id)
    record['Status'] = "Accepted"
    record.save
  end
end
