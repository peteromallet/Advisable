class Mutations::SendProposal < Mutations::BaseMutation
  argument :id, ID, required: true

  field :booking, Types::Booking, null: true
  field :errors, [String], null: false

  def resolve(**args)
    booking = find_booking(args[:id])

    if booking.status.present?
      raise GraphQL::ExecutionError, "Can't propose booking, it already has a status of #{booking.status}"
    end

    update_airtable_record(booking)
    booking.update_attributes(status: "Proposed")

    Webhook.process(booking)

    return {
      booking: booking,
      errors: booking.errors.full_messages
    }
  end

  private

  def find_booking(id)
    @booking ||= Booking.find_by("id = ? OR airtable_id = ?", id.to_i, id.to_s)
  end

  def update_airtable_record(booking)
    record = Airtable::Booking.find(booking.airtable_id)
    record["Status"] = "Proposed"
    record.save
  end
end
