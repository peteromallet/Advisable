class Types::MutationType < GraphQL::Schema::Object
  field :create_offer, mutation: Mutations::CreateOffer
  field :create_booking, mutation: Mutations::CreateBooking
  field :update_booking, mutation: Mutations::UpdateBooking
  field :send_proposal, mutation: Mutations::SendProposal
  field :send_offer, mutation: Mutations::SendOffer

  field :accept_booking, mutation: Mutations::AcceptBooking
  field :decline_booking, mutation: Mutations::DeclineBooking
  field :update_application_status, mutation: Mutations::UpdateApplicationStatus
end
