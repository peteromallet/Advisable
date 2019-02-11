require "rails_helper"

describe Payments::Charge do
  let(:project) { create(:project, deposit: 100_00, deposit_paid: 0) }
  let(:payment) { create(:payment, status: 'pending', amount: 100_00, charge_id: nil, project: project) }
  let(:airtable_record) { double(Airtable::Project) }

  before :each do
    charge = double(Stripe::Charge, id: "ch_1234")
    allow(Stripe::Charge).to receive(:create).and_return(charge)

    allow(Airtable::Project).to receive(:find).and_return(airtable_record)
    allow(airtable_record).to receive(:push)
  end

  it "creates a stripe charge" do
    expect(Stripe::Charge).to receive(:create).with({
      amount: payment.amount,
      currency: payment.currency,
      source: payment.source_id,
      receipt_email: payment.project.user.email,
      metadata: {
        name: payment.project.user.name,
        project_airtable_id: payment.project.airtable_id
      }
    }, {
      idempotency_key: payment.uid
    })
    Payments::Charge.call(payment)
  end

  it "sets the status to captured" do
    expect {
      Payments::Charge.call(payment)
    }.to change { payment.reload.status }.from("pending").to("captured")
  end

  it "stores the payment charge id" do
    expect {
      Payments::Charge.call(payment)
    }.to change { payment.reload.charge_id }.from(nil).to("ch_1234")
  end

  it "updates the project deposit_paid column" do
    expect {
      Payments::Charge.call(payment)
    }.to change { project.reload.deposit_paid }.from(0).to(100_00)
  end

  it "updates the deposit paid amount in airtable" do
    expect(airtable_record).to receive(:push)
    Payments::Charge.call(payment)
  end
end