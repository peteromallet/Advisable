class Mutations::RejectProposal < Mutations::BaseMutation
  description <<~SUMMARY
    Allows a client to reject a specialists proposal. Updates the booking status
    to declined and reject the specialists application
  SUMMARY

  argument :id, ID, required: true
  argument :reason, String, required: true
  argument :comment, String, required: false

  field :booking, Types::Booking, null: true
  field :errors, [String], null: true

  def resolve(**args)
    booking = Booking.find_by_airtable_id!(args[:id])

    {
      booking: Proposals::Reject.call(
        booking: booking,
        reason: args[:reason],
        comment: args[:comment]
      )
    }

    rescue Service::Error => e
      return { errors: [e] }
  end
end
