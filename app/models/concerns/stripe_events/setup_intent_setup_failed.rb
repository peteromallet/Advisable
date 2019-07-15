class StripeEvents::SetupIntentSucceeded < StripeEvents::BaseEvent
  def process
    return true if user.nil?
    user.update_columns(stripe_setup_intent_id: nil)
  end

  private

  def setup_intent
    event.data.object
  end

  def user
    @user ||= User.find_by_stripe_setup_intent_id(setup_intent.id)
  end
end