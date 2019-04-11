class Bookings::Create < ApplicationService
  attr_reader :application

  def initialize(application:)
    @application = application
  end

  def call
    booking = application.bookings.new(
      status: "Accepted",
      rate: application.rate
    )
    if booking.save
      return booking
    end

    raise Service::Error.new(booking.errors.full_messages.first)
  end
end