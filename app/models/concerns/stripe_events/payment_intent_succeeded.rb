class StripeEvents::PaymentIntentSucceeded < StripeEvents::BaseEvent
  def process
    # If the payment type was a deposit
    if payment_type == 'deposit'
      # Get the project from the project id that is stored in the metadata
      project = Project.find_by_uid(payment_intent.metadata.project)
      # Mark the deposit as paid
      project.deposit_paid += payment_intent.amount
      project.save(validate: false)

      # Fetch the customers existing payment methods
      payment_methods = Stripe::PaymentMethod.list(
        customer: project.user.stripe_customer_id,
        type: "card"
      )

      # Check if we have already attached this payment method to their account
      existing = payment_methods.find do |pm|
        pm.card.exp_month == payment_method.card.exp_month &&
        pm.card.exp_year == payment_method.card.exp_year &&
        pm.card.last4 == payment_method.card.last4
      end

      # If the payment method hasn't been attached before then attach it and
      # mark it as the default payment method for invoicing.
      if existing.nil?
        Users::AttachPaymentMethod.call(
          user: project.user,
          payment_method_id: payment_intent.payment_method
        )
      end
    end
  end

  private

  # We store the payment type inside of the payment intent metadata in stripe.
  # e.g Deposit payments will have a payment type of 'deposit'
  def payment_type
    payment_intent.metadata.payment_type
  end

  def payment_intent
    event.data.object
  end

  def payment_method
    Stripe::PaymentMethod.retrieve(payment_intent.payment_method)
  end
end