class Mutations::DeclineBooking < GraphQL::Schema::Mutation
  argument :id, ID, required: true
  argument :reason, String, required: true
  argument :decline_comment, String, required: false

  field :booking, Types::Booking, null: true
  field :errors, [String], null: false

  def resolve(**args)
    booking = Booking.find(args[:id])
    update_airtable_record(booking.airtable_id, args)
    booking.update_attributes(status: 'Declined', decline_reason: args[:reason], decline_comment: args[:decline_comment])

    Webhook.process(booking)

    return {
      booking: booking,
      errors: booking.errors.full_messages
    }
  end

  private

  def update_airtable_record(id, args)
    record = Airtable::Booking.find(id)
    record['Status'] = "Declined"
    record['Decline Reason'] = args[:reason]
    record['Decline Comment'] = args[:decline_comment]
    record.save
  end
end
