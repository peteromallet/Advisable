class Proposals::Reject < ApplicationService
  attr_reader :booking, :reason, :comment

  def initialize(booking:, reason:, comment:)
    @booking = booking
    @reason = reason
    @comment = comment
  end

  def call
    booking.status = "Declined"
    booking.client_decline_comment = comment

    unless booking.valid?
      raise Service::Error.new(booking.errors.full_messages.first)
    end

    application.assign_attributes(
      status: "Application Rejected",
      rejection_reason: reason
    )

    unless application.valid?
      raise Service::Error.new(application.errors.full_messages.first)
    end

    if booking.save && application.save
      booking.sync_to_airtable
      application.sync_to_airtable
      WebhookEvent.trigger("proposals.rejected")
      WebhookEvent.trigger("applications.rejected")
      return booking
    else
      raise Service::Error.new(booking.errors.full_messages.first)
    end
  end

  private

  def application
    @application ||= booking.application
  end
end