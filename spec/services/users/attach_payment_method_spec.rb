require 'rails_helper'

describe Users::AttachPaymentMethod do
  let(:user) { double(User, stripe_customer_id: "cu_12345") }
  let(:payment_method_id) { "pi_12345" }

  before :each do
    allow(Stripe::PaymentMethod).to receive(:attach)
    allow(Stripe::Customer).to receive(:update)
  end

  it "calls Stripe::PaymentMethod.attach" do
    expect(Stripe::PaymentMethod).to receive(:attach).with(payment_method_id, {
      customer: user.stripe_customer_id
    })

    Users::AttachPaymentMethod.call(user: user, payment_method_id: payment_method_id)
  end

  it "sets the payment method as the customers default payment method" do
    expect(Stripe::Customer).to receive(:update).with(user.stripe_customer_id, {
      invoice_settings: {
        default_payment_method: payment_method_id
      }
    })

    Users::AttachPaymentMethod.call(user: user, payment_method_id: payment_method_id)
  end
end