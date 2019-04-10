class Proposals::Accept < ApplicationService
  attr_reader :booking

  def initialize(booking:)
    @booking = booking
  end

  def call
    booking.status = "Accepted"
    if booking.save
      booking.sync_to_airtable
      WebhookEvent.trigger("proposals.accepted")
      return booking
    else
      raise Service::Error.new(booking.errors.full_messages.first)
    end
  end
end