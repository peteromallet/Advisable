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
          metadata: metadata
        })
      })
    })
  end

  describe "deposit" do
    let(:project) { create(:project, deposit_paid: 0) }
    let(:metadata) { OpenStruct.new({payment_type: "deposit", project: project.uid}) }

    before do
      allow(UpdateCompanysPaymentMethodJob).to receive(:perform_later)
      allow_any_instance_of(User).to receive(:stripe_customer_id).and_return("cu_1234")
      allow_any_instance_of(Project).to receive(:sync_to_airtable)
    end

    it "adds the amount to the deposit_paid" do
      expect do
        StripeEvents.process(event)
      end.to change {
        project.reload.deposit_paid
      }.from(0).to(500_00)
    end

    it "attaches the payment method" do
      expect(UpdateCompanysPaymentMethodJob).to receive(:perform_later).with(
        instance_of(Company),
        "pm_12345"
      )
      StripeEvents.process(event)
    end

    it "syncs to airtable" do
      allow(Project).to receive(:find_by!).and_return(project)
      expect(project).to receive(:sync_to_airtable)
      StripeEvents.process(event)
    end
  end

  describe "payment" do
    let(:payment) { create(:payment) }
    let(:metadata) { OpenStruct.new({payment_type: "payment", payment: payment.uid}) }

    it "updates the status" do
      expect(payment.status).to eq("pending")
      StripeEvents.process(event)
      expect(payment.reload.status).to eq("succeeded")
    end
  end
end
