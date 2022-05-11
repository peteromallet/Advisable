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

  describe "#mark_paid!" do
    let(:payment_request) { create(:payment_request) }

    it "updates the status" do
      expect(payment_request.status).to eq("pending")
      payment_request.mark_paid!
      expect(payment_request.reload.status).to eq("paid")
    end

    it "creates a message in the conversation" do
      payment_request.mark_paid!
      messages = Message.where(payment_request:)
      expect(messages.count).to eq(1)
      message = messages.first
      expect(message.kind).to eq("PaymentRequestCompleted")
      expect(message.conversation.participants.pluck(:account_id)).to match_array([payment_request.specialist.account_id, payment_request.agreement.user.account_id])
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

  describe "#set_due_at" do
    context "when no agreement" do
      let(:payment_request) { create(:payment_request, agreement_id: nil) }

      it "does not set due_at" do
        expect(payment_request).to be_persisted
        expect(payment_request.due_at).to be_nil
      end
    end

    context "when agreement doesn't have due days set" do
      let(:agreement) { create(:agreement, due_days: nil) }
      let(:payment_request) { create(:payment_request, agreement:) }

      it "sets due_at to equal default" do
        expect(payment_request).to be_persisted
        expect(payment_request.due_at).to be_within(1.second).of(payment_request.created_at + Agreement::DEFAULT_DUE_DAYS.days)
      end
    end

    context "when agreement has due days set" do
      let(:agreement) { create(:agreement, due_days: 10) }
      let(:payment_request) { create(:payment_request, agreement:) }

      it "sets due_at to equal due days" do
        expect(payment_request).to be_persisted
        expect(payment_request.due_at).to be_within(1.second).of(payment_request.created_at + 10.days)
      end
    end
  end
end
