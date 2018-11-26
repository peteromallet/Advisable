class StripeEvents::SourceCanceled < StripeEvents::BaseEvent
  def process
    # return if there is no payment record found
    return unless payment
    Payments::Failed.call(payment, "source_canceled")
  end

  private

  def source
    event.data.object
  end

  def payment
    @payment ||= Payment.find_by_source_id(source.id)
  end
end