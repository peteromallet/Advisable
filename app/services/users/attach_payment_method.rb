class Users::AttachPaymentMethod < ApplicationService
  attr_reader :user, :payment_method_id

  def initialize(user:, payment_method_id: )
    @user = user
    @payment_method_id = payment_method_id
  end

  def call
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

  private

  def payment_method
    Stripe::PaymentMethod.retrieve(payment_method_id)
  end
end