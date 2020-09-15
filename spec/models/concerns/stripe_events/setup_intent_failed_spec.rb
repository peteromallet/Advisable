require 'rails_helper'

RSpec.describe StripeEvents::SetupIntentSetupFailed do
  let!(:user) { create(:user, stripe_setup_intent_id: "si_12345", setup_intent_status: "pending") }
  let(:event) {
    OpenStruct.new({
      type: "setup_intent.setup_failed",
      data: OpenStruct.new({
        object: OpenStruct.new({
          id: "si_12345",
        })
      })
    })
  }

  it "sets the setup_intent_status attribute for the user to failed" do
    expect {
      StripeEvents.process(event)
    }.to change {
      user.reload.setup_intent_status
    }.from("pending").to("failed")
  end
end