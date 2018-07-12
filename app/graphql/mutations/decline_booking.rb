class Mutations::DeclineBooking < GraphQL::Schema::Mutation
  argument :id, ID, required: true
  argument :reason, ID, required: true
  argument :decline_comment, String, required: false

  field :booking, Types::Booking, null: true
  field :errors, [String], null: false

  def resolve(**args)
    booking = Booking.find(args[:id])
    update_airtable_record(booking.airtable_id, args)
    booking.update_attributes(status: 'Declined', rejection_reason: rejected_reason(args), decline_comment: args[:decline_comment])

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
    record['Rejected Reason'] = [rejected_reason(args).airtable_id]
    record['Decline Comment'] = args[:decline_comment]
    record.save
  end

  def rejected_reason(args)
    @rejected_reason ||= ::BookingRejectionReason.find(args[:reason])
  end
end
