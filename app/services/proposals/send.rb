# Service object that handles the action of submitting a proposal. This is
# called from the sendProposal graphql mutation.
class Proposals::Send < ApplicationService
  attr_reader :booking, :comment

  def initialize(booking:, comment:)
    @booking = booking
    @comment = comment
  end

  def call
    booking.proposal_comment = comment
    booking.status = "Proposed"
    if booking.save
      booking.sync_to_airtable
      booking.application.update_attributes(status: "Proposed")
      booking.application.sync_to_airtable
      WebhookEvent.trigger("proposals.sent")
      return booking
    else
      raise Service::Error.new(booking.errors.full_messages.first)
    end
  end
end