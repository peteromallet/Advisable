class Mutations::SendProposal < Mutations::BaseMutation
  argument :booking, ID, required: true
  argument :proposal_comment, String, required: true

  field :booking, Types::Booking, null: true
  field :errors, [Types::Error], null: true

  def resolve(**args)
    booking = Booking.find_by_airtable_id(args[:booking])

    {
      booking: Proposals::Send.call(
        booking: booking,
        comment: args[:proposal_comment]
      )
    }

  rescue Service::Error => e
    return { errors: [e] }
  end
end
