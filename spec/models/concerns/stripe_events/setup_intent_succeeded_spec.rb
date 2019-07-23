require 'rails_helper'

describe StripeEvents::SetupIntentSucceeded do
  let!(:user) { create(:user, stripe_setup_intent_id: "si_12345", setup_intent_status: "pending") }
  let(:event) {
    OpenStruct.new({
      type: "setup_intent.succeeded",
      data: OpenStruct.new({
        object: OpenStruct.new({
          id: "si_12345",
          payment_method: "pm_12345"
        })
      })
    })
  }

  before :each do
    allow(Users::AttachPaymentMethod).to receive(:call)
  end

  it "sets the setup_intent_status attribute for the user to succeeded" do
    expect {
      StripeEvents.process(event)
    }.to change {
      user.reload.setup_intent_status
    }.from("pending").to("succeeded")
  end

  it 'calls the attach payment method service' do
    expect(Users::AttachPaymentMethod).to receive(:call).with(
      user: instance_of(User),
      payment_method_id: "pm_12345"
    )
    StripeEvents.process(event)
  end

  context 'when the user cant be found' do
    let!(:user) { create(:user, stripe_setup_intent_id: nil )}

    it 'returns true' do
      expect(StripeEvents.process(event)).to be_truthy
    end
  end
end