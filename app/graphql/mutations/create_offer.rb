class Mutations::CreateOffer < Mutations::BaseMutation
  argument :type, String, required: true
  argument :duration, String, required: false
  argument :rate, Float, required: true
  argument :rate_type, String, required: true
  argument :rate_limit, Float, required: false
  argument :deliverables, [String], required: true
  argument :application_id, ID, required: true
  argument :start_date, Types::Date, required: false
  argument :end_date, Types::Date, required: false
  argument :proposal_id, ID, required: false

  field :booking, Types::Booking, null: true
  field :errors, [String], null: false

  def resolve(**args)
    application = find_application(args[:application_id])
    booking = initialize_booking(args)
    attrs = booking_attributes(args, application)
    booking.assign_attributes(attrs)
    booking.calculate_end_date

    if booking.valid?
      sync_airtable_record(booking)
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
    args.slice(:type, :rate, :rate_type, :rate_limit, :duration, :start_date, :end_date, :deliverables)
      .merge(application: application, status: 'Offered')
  end

  def find_application(id)
    @application ||= Application.find_by("id = ? OR airtable_id = ?", id.to_i, id.to_s)
  end

  def initialize_booking(args)
    return Booking.new unless (args[:proposal_id])
    Booking.find_by_airtable_id(args[:proposal_id])
  end

  def update_application_status(application)
    airtable_record = Airtable::Application.find(application.airtable_id)
    airtable_record["Application Status"] = 'Offered'
    airtable_record.save
    application.update_attributes(status: 'Offered')
    Webhook.process(application)
  end

  def sync_airtable_record(booking)
    return create_new_airtable_booking(booking) unless booking.airtable_id
    update_airtable_proposal(booking)
  end

  def create_new_airtable_booking(booking)
    record = Airtable::Booking.new(airtable_attributes(booking))
    record.create
    booking.airtable_id = record.id
  end

  def update_airtable_proposal(booking)
    record = Airtable::Booking.find(booking.airtable_id)
    airtable_attributes(booking).each do |attr, value|
      record[attr] = value
    end
    record.save
  end

  def airtable_attributes(booking)
    {
      "Type" => booking.type,
      "Rate" => booking.rate.to_f,
      "Rate Type" => booking.rate_type,
      "Rate Limit" => booking.rate_limit.to_f,
      "Duration" => booking.duration,
      "Status" => "Offered",
      "Est. Project Start Date" => booking.start_date,
      "Est. Project End Date" => booking.end_date,
      "Deliverables" => booking.deliverables.to_json,
      "Application" => [booking.application.airtable_id]
    }
  end
end
