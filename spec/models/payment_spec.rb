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

  describe "#create_in_stripe!" do
    let(:project) { create(:project) }
    let(:payment) { create(:payment, amount: 1000, task: create(:task, application: create(:application, project: project))) }

    context "when deposit is bigger than amount" do
      let(:project) { create(:project, deposit: 2000) }

      it "updates deposit_used, sets status to succeeded, payment method to deposit and doesn't charge stripe" do
        expect(Stripe::PaymentIntent).not_to receive(:create)
        payment.create_in_stripe!
        expect(payment.status).to eq("succeeded")
        expect(payment.payment_method).to eq("Deposit")
        expect(project.deposit_used).to eq(payment.amount_with_fee)
      end

      context "when a bit of deposit has been used already" do
        let(:project) { create(:project, deposit: 2000, deposit_used: 100) }

        it "updates deposit_used, sets status to succeeded, payment method to deposit and doesn't charge stripe" do
          expect(Stripe::PaymentIntent).not_to receive(:create)
          payment.create_in_stripe!
          expect(payment.status).to eq("succeeded")
          expect(payment.payment_method).to eq("Deposit")
          expect(project.deposit_used).to eq(payment.amount_with_fee + 100)
        end
      end

      context "when company payment method is bank transfer" do
        it "updates deposit_used, sets payment method to deposit and doesn't charge stripe" do
          payment.company.update!(project_payment_method: "Bank Transfer")
          expect(Stripe::PaymentIntent).not_to receive(:create)
          payment.create_in_stripe!
          expect(payment.payment_method).to eq("Deposit")
          expect(project.deposit_used).to eq(payment.amount_with_fee)
        end
      end
    end

    context "when deposit is smaller than amount" do
      let(:project) { create(:project, deposit: 200) }

      it "updates deposit_used, sets payment method to stripe and charges stripe" do
        allow(Stripe::PaymentIntent).to receive(:create).with(hash_including(amount: payment.amount_with_fee - 200), anything).and_return(OpenStruct.new(id: "pi_#{SecureRandom.uuid}", status: "succeeded"))
        payment.create_in_stripe!
        expect(payment.payment_method).to eq("Stripe")
        expect(project.deposit_used).to eq(200)
      end

      context "when company payment method is bank transfer" do
        it "updates deposit_used, sets payment method to bank transfer and charges stripe" do
          payment.company.update!(project_payment_method: "Bank Transfer")
          expect(Stripe::PaymentIntent).not_to receive(:create)
          payment.create_in_stripe!
          expect(payment.payment_method).to eq("Bank Transfer")
          expect(project.deposit_used).to eq(200)
        end
      end
    end

    context "when deposit is nil" do
      let(:project) { create(:project, deposit: nil) }

      it "charges stripe with full amount" do
        allow(Stripe::PaymentIntent).to receive(:create).with(hash_including(amount: payment.amount_with_fee), anything).and_return(OpenStruct.new(id: "pi_#{SecureRandom.uuid}", status: "succeeded"))
        payment.create_in_stripe!
        expect(payment.payment_method).to eq("Stripe")
        expect(project.deposit_used).to eq(0)
      end
    end

    context "when deposit has been used" do
      let(:project) { create(:project, deposit: 2000, deposit_used: 2000) }

      it "charges stripe with full amount" do
        allow(Stripe::PaymentIntent).to receive(:create).with(hash_including(amount: payment.amount_with_fee), anything).and_return(OpenStruct.new(id: "pi_#{SecureRandom.uuid}", status: "succeeded"))
        payment.create_in_stripe!
        expect(payment.payment_method).to eq("Stripe")
        expect(project.deposit_used).to eq(2000)
      end
    end

    context "when no task" do
      let(:payment) { create(:payment, amount: 1000, task: nil) }

      it "charges stripe with full amount" do
        allow(Stripe::PaymentIntent).to receive(:create).with(hash_including(amount: payment.amount_with_fee), anything).and_return(OpenStruct.new(id: "pi_#{SecureRandom.uuid}", status: "succeeded"))
        payment.create_in_stripe!
        expect(payment.payment_method).to eq("Stripe")
        expect(payment.deposit).to be_nil
      end
    end
  end
end
