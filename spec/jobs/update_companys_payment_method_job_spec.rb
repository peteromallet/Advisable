# frozen_string_literal: true

require "rails_helper"

RSpec.describe UpdateCompanysPaymentMethodJob do
  let(:company) { create(:company, stripe_customer_id: "cu_12345") }
  let(:payment_method_id) { "pi_12345" }

  before do
    allow(Stripe::PaymentMethod).to receive(:attach)
    allow(Stripe::Customer).to receive(:update)
    allow(Stripe::PaymentMethod).to receive(:list).and_return(OpenStruct.new(data: []))
  end

  it "calls Stripe::PaymentMethod.attach" do
    expect(Stripe::PaymentMethod).to receive(:attach).with(payment_method_id, {customer: company.stripe_customer_id})

    described_class.perform_now(company, payment_method_id)
  end

  it "sets the payment method as the customers default payment method" do
    expect(Stripe::Customer).to receive(:update).with(company.stripe_customer_id, {invoice_settings: {default_payment_method: payment_method_id}})

    described_class.perform_now(company, payment_method_id)
  end

  context "when the payment method has already been attached" do
    it "doesnt try to attach it" do
      pm = OpenStruct.new(id: payment_method_id)
      allow(Stripe::PaymentMethod).to receive(:list).and_return(OpenStruct.new(data: [pm]))
      expect(Stripe::PaymentMethod).not_to receive(:attach)
      described_class.perform_now(company, payment_method_id)
    end
  end
end
