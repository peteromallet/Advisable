require 'rails_helper'

describe Users::AttachPaymentMethod do
  let(:user) { double(User, stripe_customer_id: "cu_12345") }
  let(:payment_method_id) { "pi_12345" }

  before :each do
    allow(Stripe::PaymentMethod).to receive(:attach)
    allow(Stripe::Customer).to receive(:update)
    allow(Stripe::PaymentMethod).to receive(:list).and_return(OpenStruct.new(data: []))
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

  context 'when the payment method has already been attached' do
    it 'doesnt try to attach it' do
      pm = OpenStruct.new(id: payment_method_id)
      allow(Stripe::PaymentMethod).to receive(:list).and_return(OpenStruct.new(data: [pm]))
      expect(Stripe::PaymentMethod).not_to receive(:attach)
      Users::AttachPaymentMethod.call(user: user, payment_method_id: payment_method_id)
    end
  end
end