class Mutations::UpdateProposal < Mutations::BaseMutation
  argument :booking, ID, required: true
  argument :rate, Float, required: true

  field :booking, Types::Booking, null: true
  field :errors, [Types::Error], null: true

  def resolve(**args)
    booking = Booking.find_by_airtable_id(args[:booking])

    {
      booking: Proposals::Update.call(
        proposal: booking,
        attributes: args.except(:booking)
      )
    }

  rescue Service::Error => e
    return { errors: [e] }
  end
end
