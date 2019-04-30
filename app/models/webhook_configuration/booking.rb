class WebhookConfiguration::Booking < WebhookConfiguration
  def data(booking)
    base = {
      id: booking.id,
      airtable_id: booking.airtable_id,
      type: booking.type,
      rate: booking.rate,
      rate_type: booking.rate_type,
      rate_limit: booking.rate_limit,
      status: booking.status,
      duration: booking.duration,
      deliverables: booking.deliverables,
      decline_comment: booking.decline_comment,
      application: {
        id: booking.application.id,
        airtable_id: booking.application.airtable_id
      },
      rejection_reason: nil
    }

    base
  end
end
