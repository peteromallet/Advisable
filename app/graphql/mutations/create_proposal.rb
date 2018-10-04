class Mutations::CreateProposal < Mutations::BaseMutation
  argument :type, String, required: true
  argument :duration, String, required: false
  argument :rate, Float, required: true
  argument :rate_type, String, required: true
  argument :rate_limit, Float, required: false
  argument :proposal_comment, String, required: false
  argument :deliverables, [String], required: true
  argument :application_id, ID, required: true
  argument :start_date, Types::Date, required: false
  argument :end_date, Types::Date, required: false

  field :booking, Types::Booking, null: true
  field :errors, [String], null: true

  def resolve(**args)
    application = find_application(args[:application_id])

    booking = Booking.new
    attrs = booking_attributes(args, application)
    booking.assign_attributes(attrs)
    booking.calculate_end_date

    if booking.valid?
      record = sync_airtable_record(booking)
      booking.airtable_id = record.id
      booking.save
      update_application_status(application)
      Webhook.process(booking)
      return { booking: booking, errors: [] }
    end

    return {
      errors: booking.errors.full_messages
    }
  end

  private

  def booking_attributes(args, application)
    args.slice(:type, :rate, :rate_type, :proposal_comment, :duration, :start_date, :end_date, :deliverables)
      .merge(application: application, status: 'Proposed')
  end

  def find_application(id)
    @application ||= Application.find_by("id = ? OR airtable_id = ?", id.to_i, id.to_s)
  end

  def update_application_status(application)
    airtable_record = Airtable::Application.find(application.airtable_id)
    airtable_record["Application Status"] = 'Proposed'
    airtable_record.save
    application.update_attributes(status: 'Proposed')
  end

  def sync_airtable_record(booking)
    record = Airtable::Booking.new(airtable_attributes(booking))
    record.create
    record
  end

  def airtable_attributes(booking)
    {
      "Type" => booking.type,
      "Rate" => booking.rate.to_f,
      "Rate Type" => booking.rate_type,
      "Rate Limit" => booking.rate_limit.to_f,
      "Duration" => booking.duration,
      "Status" => "Proposed",
      "Est. Project Start Date" => booking.start_date,
      "Est. Project End Date" => booking.end_date,
      "Deliverables" => booking.deliverables.to_json,
      "Proposal Comment" => booking.proposal_comment,
      "Application" => [booking.application.airtable_id]
    }
  end
end
