# frozen_string_literal: true

require "rails_helper"

RSpec.describe StripeEvents::SetupIntentSucceeded do
  let!(:company) { create(:company, stripe_setup_intent_id: "si_12345", setup_intent_status: "pending") }
  let(:event) do
    OpenStruct.new({
      type: "setup_intent.succeeded",
      data: OpenStruct.new({
        object: OpenStruct.new({
          id: "si_12345",
          payment_method: "pm_12345"
        })
      })
    })
  end

  before do
    allow(UpdateCompanysPaymentMethodJob).to receive(:perform_later)
    create(:user, company: company)
  end

  it "sets the setup_intent_status attribute for the user to succeeded" do
    expect do
      StripeEvents.process(event)
    end.to change {
      company.reload.setup_intent_status
    }.from("pending").to("succeeded")
  end

  it "calls the attach payment method service" do
    expect(UpdateCompanysPaymentMethodJob).to receive(:perform_later).with(
      instance_of(Company),
      "pm_12345"
    )
    StripeEvents.process(event)
  end

  context "when the user cant be found" do
    it "returns true" do
      company.update(stripe_setup_intent_id: nil)
      expect(StripeEvents.process(event)).to be_truthy
    end
  end
end
