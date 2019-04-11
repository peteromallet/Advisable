class Mutations::CreateBooking < Mutations::BaseMutation
  argument :application, ID, required: true

  field :booking, Types::Booking, null: true
  field :errors, [Types::Error], null: true

  def resolve(application:)
    application = Application.find_by_airtable_id!(application)
    booking = Bookings::Create.call(application: application)
    
    {
      booking: booking
    }

    rescue Service::Error => e
      return { errors: [e] }
  end
end
