class Users::AttachPaymentMethod < ApplicationService
  attr_reader :user, :payment_method_id

  def initialize(user:, payment_method_id: )
    @user = user
    @payment_method_id = payment_method_id
  end

  def call
    # Fetch the customers existing payment methods
    payment_methods = Stripe::PaymentMethod.list(
      customer: user.stripe_customer_id,
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
      # Attach the payment method to the customer
      Stripe::PaymentMethod.attach(payment_method_id, {
        customer: user.stripe_customer_id
      })

      # Set the payment method as the customer's default payment method
      Stripe::Customer.update(user.stripe_customer_id, {
        invoice_settings: {
          default_payment_method: payment_method_id
        }
      })
    end
  end

  private

  def payment_method
    Stripe::PaymentMethod.retrieve(payment_method_id)
  end
end