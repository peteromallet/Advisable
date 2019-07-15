class StripeEvents::SetupIntentSucceeded < StripeEvents::BaseEvent
  def process
    return true if user.nil?
    user.update_columns(setup_intent_status: 'succeeded')
    Users::AttachPaymentMethod.call(
      user: user,
      payment_method_id: setup_intent.payment_method
    )
  end

  private

  def setup_intent
    event.data.object
  end

  def user
    @user ||= User.find_by_stripe_setup_intent_id(setup_intent.id)
  end
end