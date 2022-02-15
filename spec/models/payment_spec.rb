# frozen_string_literal: true

require "rails_helper"

RSpec.describe Payment, type: :model do
  let(:payment) { build(:payment, amount: 10000) }

  it "has a valid factory" do
    expect(payment).to be_valid
  end

  describe "#admin_fee" do
    it "sets fee if it's not present" do
      expect(payment.admin_fee).to be_nil
      payment.save!
      expect(payment.admin_fee).to eq(500)
    end

    context "when fee is set explicitly" do
      let(:payment) { build(:payment, admin_fee: 75) }

      it "does not overwrite it" do
        expect(payment.admin_fee).to eq(75)
        payment.save!
        expect(payment.admin_fee).to eq(75)
      end
    end
  end

  describe "#mark_paid!" do
    let(:payment) { create(:payment) }

    it "sends an email receipt to the company" do
      payment.mark_paid!
      expect(ActionMailer::MailDeliveryJob).to have_been_enqueued.with("UserMailer", "payment_receipt", "deliver_now", args: [payment]).once
    end
  end

  describe "#charge!" do
    let(:project) { create(:project) }
    let(:payment) { create(:payment, payment_request:, amount: 1000) }
    let(:payment_request) { create(:payment_request) }

    it "charges stripe with full amount and schedules invoice creation" do
      allow(Stripe::PaymentIntent).to receive(:create).with(hash_including(amount: 1050), anything).and_return(OpenStruct.new(id: "pi_#{SecureRandom.uuid}", status: "succeeded"))
      expect(payment_request.reload.status).to eq("pending")
      payment.charge!
      expect(payment.payment_method).to eq("Stripe")
      expect(GeneratePaymentInvoiceJob).to have_been_enqueued.with(payment, notify: true).once
      expect(payment_request.reload.status).to eq("paid")
    end

    context "when VAT" do
      before { allow(payment.company).to receive(:apply_vat?).and_return(true) }

      it "charges stripe with full amount in integer and schedules invoice creation" do
        allow(Stripe::PaymentIntent).to receive(:create).with(hash_including(amount: 1292), anything).and_return(OpenStruct.new(id: "pi_#{SecureRandom.uuid}", status: "succeeded"))
        expect(payment_request.reload.status).to eq("pending")
        payment.charge!
        expect(payment.payment_method).to eq("Stripe")
        expect(GeneratePaymentInvoiceJob).to have_been_enqueued.with(payment, notify: true).once
        expect(payment_request.reload.status).to eq("paid")
      end
    end
  end
end
