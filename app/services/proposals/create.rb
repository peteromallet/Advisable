class Proposals::Create < ApplicationService
  attr_reader :proposal

  def initialize(application:, attributes:)
    @proposal = application.bookings.new(booking_attributes(attributes))
  end

  def call
    if proposal.save
      proposal.sync_to_airtable
      return proposal
    else
      raise Service::Error.new(proposal.errors.full_messages.first)
    end
  end


  private

  def booking_attributes(attributes)
    attributes.slice(:rate).merge({
      status: "Proposal Started"
    })
  end
end