class Types::MutationType < GraphQL::Schema::Object
  field :create_offer, mutation: Mutations::CreateOffer
  field :create_proposal, mutation: Mutations::CreateProposal
  field :update_proposal, mutation: Mutations::UpdateProposal

  field :accept_booking, mutation: Mutations::AcceptBooking
  field :decline_booking, mutation: Mutations::DeclineBooking
  field :update_application_status, mutation: Mutations::UpdateApplicationStatus

  field :reject_proposal, mutation: Mutations::RejectProposal
end
