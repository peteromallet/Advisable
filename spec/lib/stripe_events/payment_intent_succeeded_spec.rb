require 'rails_helper'

RSpec.describe StripeEvents::SetupIntentSucceeded do
  let(:project) { create(:project, deposit_paid: 0) }
  let(:event) {
    OpenStruct.new({
      type: "payment_intent.succeeded",
      data: OpenStruct.new({
        object: OpenStruct.new({
          id: "pi_12345",
          amount: 500_00,
          payment_method: "pm_12345",
          metadata: OpenStruct.new({
            payment_type: "deposit",
            project: project.uid
          })
        })
      })
    })
  }

  before :each do
    allow(Users::AttachPaymentMethod).to receive(:call)
    allow_any_instance_of(User).to receive(:stripe_customer_id).and_return("cu_1234")
    allow(Stripe::PaymentMethod).to receive(:list).and_return([])
    allow_any_instance_of(Project).to receive(:sync_to_airtable)
  end

  it "Adds the amount to the 'deposit_paid'" do
    expect {
      StripeEvents.process(event)
    }.to change {
      project.reload.deposit_paid
    }.from(0).to(500_00)
  end

  it 'attaches the payment method' do
    expect(Users::AttachPaymentMethod).to receive(:call).with(
      user: instance_of(User),
      payment_method_id: "pm_12345"
    )
    StripeEvents.process(event)
  end

  it "syncs to airtable" do
    allow(Project).to receive(:find_by_uid).and_return(project)
    expect(project).to receive(:sync_to_airtable)
    StripeEvents.process(event)
  end
end