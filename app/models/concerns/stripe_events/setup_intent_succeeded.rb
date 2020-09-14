# Handler for the stripe setup_intent.succeeded webhook event. This fires when
# a user has completed the setup flow for adding a card. We do two things
# inside this class. We attach the payment method to the customer object by
# calling the AttachPaymentMethod service. Then we update the users
# 'setup_intent_status' is set to 'succeeded' to indicate that the setup process
# has been complete. During the flow for adding a card we poll the API until the
# users setup_intent_status changes from pending to succeeded.
class StripeEvents::SetupIntentSucceeded < StripeEvents::BaseEvent
  def process
    # If the user record wasn't found then just return true
    return true if user.nil?
    # Attach the payment method
    Users::AttachPaymentMethod.call(
      user: user,
      payment_method_id: setup_intent.payment_method
    )
    # Update the setup_intent_status so the frontend can respond
    user.update_columns(setup_intent_status: 'succeeded')
  end

  private

  def setup_intent
    event.data.object
  end

  def user
    @user ||= User.find_by_stripe_setup_intent_id(setup_intent.id)
  end
end