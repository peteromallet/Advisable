class WebhookConfiguration::Booking < WebhookConfiguration
  def data(booking)
    booking.attributes
  end
end
