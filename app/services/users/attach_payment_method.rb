class Users::AttachPaymentMethod < ApplicationService
  attr_reader :user, :payment_method_id

  def initialize(user:, payment_method_id:)
    @user = user
    @payment_method_id = payment_method_id
  end

  def call
    existing = Stripe::PaymentMethod.list(
      customer: stripe_customer_id,
      type: "card"
    )

    unless existing.data.map(&:id).include?(payment_method_id)
      # Attach the payment method to the customer
      Stripe::PaymentMethod.attach(payment_method_id, {
        customer: stripe_customer_id
      })
    end

    # Set the payment method as the customer's default payment method
    Stripe::Customer.update(stripe_customer_id, {
      invoice_settings: {default_payment_method: payment_method_id}
    })
  end

  private

  def stripe_customer_id
    @stripe_customer_id ||= user.company.stripe_customer_id
  end
end
