class Mutations::CreateProposal < Mutations::BaseMutation
  argument :application, ID, required: true
  argument :rate, Float, required: true

  field :booking, Types::Booking, null: true
  field :errors, [Types::Error], null: true

  def resolve(**args)
    application = Application.find_by_airtable_id(args[:application])

    {
      booking: Proposals::Create.call(
        application: application,
        attributes: args.except(:application)
      )
    }

  rescue Service::Error => e
    return { errors: [e] }
  end
end
