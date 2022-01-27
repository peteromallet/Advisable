# frozen_string_literal: true

require "rails_helper"

RSpec.describe PaymentRequest, type: :model do
  let(:payment_request) { create(:payment_request) }

  it "has a valid factory" do
    expect(payment_request).to be_valid
  end

  describe "amount overriding" do
    it "allows to override line items amount" do
      expect(payment_request.reload.amount).to eq(payment_request.line_items.sum { |item| item["amount"] })
      payment_request.update(amount: 123456789)
      expect(payment_request.reload.amount).to eq(123456789)
    end
  end

  describe "#financialize!" do
    before { allow(Stripe::PaymentIntent).to receive(:create).and_return(OpenStruct.new(id: "pi_123asdf456", status: "succeeded")) }

    context "when amount is positive" do
      it "creates payment and payout and charges payment" do
        expect(payment_request.payout).to be_nil
        expect(payment_request.payment).to be_nil
        payment_request.financialize!
        expect(payment_request.payout).not_to be_nil
        expect(payment_request.payment).not_to be_nil
        expect(payment_request.payment.amount).to eq(payment_request.amount)
        expect(payment_request.payout.amount).to eq(payment_request.amount)
        expect(payment_request.payment.payment_intent_id).to eq("pi_123asdf456")
      end
    end

    context "when amount is zero" do
      let(:payment_request) { create(:payment_request, amount: 0) }

      it "doesn't create anything" do
        expect(payment_request.payout).to be_nil
        expect(payment_request.payment).to be_nil
        payment_request.financialize!
        expect(payment_request.payout).to be_nil
        expect(payment_request.payment).to be_nil
      end
    end
  end
end
