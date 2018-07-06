class Mutations::CreateOffer < Mutations::BaseMutation
  argument :type, String, required: true
  argument :duration, String, required: false
  argument :rate, Float, required: true
  argument :rate_type, String, required: true
  argument :rate_limit, Float, required: false
  argument :deliverables, [String], required: true
  argument :application_id, ID, required: true

  field :booking, Types::Booking, null: true
  field :errors, [String], null: false

  def resolve(**args)
    update_application_status(args[:application_id])
    airtable_record = create_airtable_record(args)

    booking = Booking.create(args.merge({
      status: 'Offered',
      airtable_id: airtable_record.id
    }))

    Webhook.process(booking)

    return {
      booking: booking,
      errors: booking.errors.full_messages
    }
  end

  private

  def update_application_status(id)
    application = Application.find(id)
    airtable_record = Airtable::Application.find(application.airtable_id)
    airtable_record["Application Status"] = 'Offered'
    airtable_record.save
    application.update_attributes(status: 'Offered')
  end

  def create_airtable_record(args)
    application = Application.find(args[:application_id])
    record = Airtable::Booking.new(
      "Type" => args[:type],
      "Rate" => args[:rate],
      "Rate Type" => args[:rate_type],
      "Rate Limit" => args[:rate_limit],
      "Status" => "Offered",
      "Duration" => args[:duration],
      "Deliverables" => args[:deliverables].reject(&:empty?).to_json,
      "Application" => [application.airtable_id],
    )
    record.create
    record
  end
end
