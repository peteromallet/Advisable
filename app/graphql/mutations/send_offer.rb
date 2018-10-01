class Mutations::SendOffer < Mutations::BaseMutation
  argument :id, ID, required: true

  field :booking, Types::Booking, null: true
  field :errors, [String], null: false

  def resolve(**args)
    booking = find_booking(args[:id])

    unless booking.status.empty? || booking.status == "Proposed"
      raise GraphQL::ExecutionError, "Can't send offer, booking record already has a status of #{booking.status}"
    end

    update_airtable_record(booking)
    booking.update_attributes(status: "Offered")

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
    record["Status"] = "Offered"
    record.save
  end
end
