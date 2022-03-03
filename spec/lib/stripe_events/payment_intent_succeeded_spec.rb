# frozen_string_literal: true

require "rails_helper"

RSpec.describe StripeEvents::PaymentIntentSucceeded do
  let(:event) do
    OpenStruct.new({
      type: "payment_intent.succeeded",
      data: OpenStruct.new({
        object: OpenStruct.new({
          id: "pi_12345",
          amount: 500_00,
          payment_method: "pm_12345",
          status: "succeeded",
          metadata:
        })
      })
    })
  end

  describe "payment" do
    let(:payment) { create(:payment) }
    let(:metadata) { OpenStruct.new({payment_type: "payment", payment: payment.uid}) }

    it "updates the status" do
      expect(payment.status).to eq("pending")
      expect(payment.charged_at).to be_nil
      StripeEvents.process(event)
      payment.reload
      expect(payment.status).to eq("succeeded")
      expect(payment.charged_at).to be_present
      expect(ActionMailer::MailDeliveryJob).to have_been_enqueued.with("UserMailer", "payment_receipt", "deliver_now", args: [payment]).once
    end

    context "with payment request" do
      let(:payment_request) { create(:payment_request) }
      let(:payment) { create(:payment, payment_request:) }

      it "updates the payment request status" do
        expect(payment.status).to eq("pending")
        expect(payment.charged_at).to be_nil
        expect(payment_request.status).to eq("pending")
        StripeEvents.process(event)
        payment.reload
        payment_request.reload
        expect(payment.status).to eq("succeeded")
        expect(payment.charged_at).to be_present
        expect(payment_request.status).to eq("paid")
      end
    end
  end

  describe "no metadata" do
    let(:metadata) { OpenStruct.new }

    it "does nothing" do
      expect(StripeEvents.process(event)).to be_nil
    end
  end

  describe "unsupported payment type" do
    let(:metadata) { OpenStruct.new({payment_type: "charge"}) }

    it "does nothing" do
      expect(StripeEvents.process(event)).to be_nil
    end
  end
end
