class Mutations::CreateBooking < Mutations::BaseMutation
  argument :type, String, required: true
  argument :duration, String, required: false
  argument :rate, Float, required: true
  argument :rate_type, String, required: true
  argument :rate_limit, Float, required: false
  argument :deliverables, [String], required: true
  argument :application_id, ID, required: true
  argument :start_date, Types::Date, required: false
  argument :end_date, Types::Date, required: false

  field :booking, Types::Booking, null: true
  field :errors, [String], null: false

  def resolve(**args)
    args[:deliverables] = args[:deliverables].reject(&:empty?) if args[:deliverables]
    application = find_application(args[:application_id])

    booking = Booking.new
    booking.assign_attributes(args.merge(application: application))
    booking.calculate_end_date

    airtable_record = create_airtable_record(booking)
    booking.airtable_id = airtable_record.id
    booking.save

    Webhook.process(booking)

    return {
      booking: booking,
      errors: booking.errors.full_messages
    }
  end

  private

  def find_application(id)
    @application ||= Application.find_by("id = ? OR airtable_id = ?", id.to_i, id.to_s)
  end

  def create_airtable_record(booking)
    record = Airtable::Booking.new(
      "Type" => booking.type,
      "Rate" => booking.rate.to_f,
      "Rate Type" => booking.rate_type,
      "Rate Limit" => booking.rate_limit.to_f,
      "Duration" => booking.duration,
      "Deliverables" => booking.deliverables.to_json,
      "Application" => [booking.application.airtable_id],
      "Est. Project Start Date" => booking.start_date,
      "Est. Project End Date" => booking.end_date
    )
    record.create
    record
  end
end
