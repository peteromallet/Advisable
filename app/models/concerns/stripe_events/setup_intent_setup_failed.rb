# Handler for the stripe setup_intent.setup_failed webhook. This is fired when
# the setup flow for adding a payment method fails. All we do in this case is
# update the setup_intent_status to 'failed' so that the front end can respond.
class StripeEvents::SetupIntentSetupFailed < StripeEvents::BaseEvent
  def process
    return true if user.nil?
    user.update_columns(setup_intent_status: 'failed')
  end

  private

  def setup_intent
    event.data.object
  end

  def user
    @user ||= User.find_by_stripe_setup_intent_id(setup_intent.id)
  end
end