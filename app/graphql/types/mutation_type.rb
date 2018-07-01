class Types::MutationType < GraphQL::Schema::Object
  field :create_offer, mutation: Mutations::CreateOffer
  field :accept_booking, mutation: Mutations::AcceptBooking
  field :decline_booking, mutation: Mutations::DeclineBooking
  field :update_application_status, mutation: Mutations::UpdateApplicationStatus
end
