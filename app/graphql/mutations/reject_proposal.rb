class Mutations::RejectProposal < Mutations::BaseMutation
  description <<~SUMMARY
    Allows a client to reject a specialists proposal. Updates the booking status
    to declined and reject the specialists application
  SUMMARY

  argument :id, ID, required: true, description:
    'The airtable ID of the booking'

  argument :reason, ID, required: true, description:
    "The airtable ID of the application rejection reason. It's important to note
    that this is not a booking rejection reason."

  argument :comment, String, required: false, description:
    'An optional comment as to why the proposal is being rejected'

  field :booking, Types::Booking, null: true
  field :errors, [String], null: true

  def resolve(**args)
    booking = Booking.find_by_airtable_id(args[:id])
    booking.assign_attributes(client_decline_comment: args[:comment], status: 'Declined')

    if booking.valid?
      sync_with_airtable(booking)
      booking.save
      update_application_status(booking.application)
      Webhook.process(booking)
      return { booking: booking, errors: [] }
    end

    return {
      errors: booking.errors.full_messages
    }
  end

  private

  def update_application_status(application)
    airtable_record = Airtable::Application.find(application.airtable_id)
    airtable_record["Application Status"] = 'Application Rejected'
    airtable_record.save
    application.update_attributes(status: 'Application Rejected')
    Webhook.process(application)
  end

  def sync_with_airtable(booking)
    record = Airtable::Booking.find(booking.airtable_id)
    record['Client Decline Comment'] = booking.client_decline_comment
    record['Status'] = 'Declined'
    record.save
  end
end
