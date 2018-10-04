class Mutations::UpdateBooking < Mutations::BaseMutation
  argument :id, ID, required: true
  argument :type, String, required: false
  argument :duration, String, required: false
  argument :rate, Float, required: false
  argument :rate_type, String, required: false
  argument :proposal_comment, String, required: false
  argument :rate_limit, Float, required: false
  argument :deliverables, [String], required: false
  argument :start_date, Types::Date, required: false
  argument :end_date, Types::Date, required: false

  field :booking, Types::Booking, null: true
  field :errors, [String], null: false

  def resolve(**args)
    args[:deliverables] = args[:deliverables].reject(&:empty?) if args[:deliverables]
    booking = find_booking(args[:id])
    booking.assign_attributes(args.slice(:type, :duration, :rate, :rate_type, :rate_limit, :deliverables, :start_date, :end_date, :proposal_comment))
    booking.calculate_end_date

    update_airtable_record(booking)

    booking.save!

    Webhook.process(booking)

    return {
      booking: booking,
      errors: booking.errors.full_messages
    }
  end

  private

  def find_booking(id)
    @booking ||= Booking.find_by_airtable_id(id)
  end

  def update_airtable_record(booking)
    record = Airtable::Booking.find(booking.airtable_id)
    record['Type'] = booking.type
    record['Rate'] = booking.rate.to_f
    record['Rate Type'] = booking.rate_type
    record['Rate Limit'] = booking.rate_limit.to_f
    record['Duration'] = booking.duration
    record['Est. Project Start Date'] = booking.start_date
    record['Est. Project End Date'] = booking.end_date
    record['Deliverables'] = booking.deliverables.to_json
    record['Proposal Comment'] = booking.proposal_comment
    record.save
  end
end
