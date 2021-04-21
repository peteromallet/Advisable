require 'rails_helper'

RSpec.describe StripeEvents::SetupIntentSetupFailed do
  let!(:company) { create(:company, stripe_setup_intent_id: "si_12345", setup_intent_status: "pending") }
  let(:event) {
    OpenStruct.new({
      type: "setup_intent.setup_failed",
      data: OpenStruct.new({object: OpenStruct.new({id: "si_12345",})})
    })
  }

  it "sets the setup_intent_status attribute for the company to failed" do
    expect {
      StripeEvents.process(event)
    }.to change {
      company.reload.setup_intent_status
    }.from("pending").to("failed")
  end
end
