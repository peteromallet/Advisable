# frozen_string_literal: true

require "rails_helper"

RSpec.describe StripeEvents::SetupIntentSetupFailed do
  let!(:company) { create(:company, stripe_setup_intent_id: "si_12345", setup_intent_status: "pending") }
  let(:event) do
    OpenStruct.new({
      type: "setup_intent.setup_failed",
      data: OpenStruct.new({object: OpenStruct.new({id: "si_12345"})})
    })
  end

  it "sets the setup_intent_status attribute for the company to failed" do
    expect do
      StripeEvents.process(event)
    end.to change {
      company.reload.setup_intent_status
    }.from("pending").to("failed")
  end
end
