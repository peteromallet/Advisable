require "rails_helper"

describe Mutations::CreatePayment do
  let(:project) { create(:project, deposit: 100_00, deposit_paid: 0) }

  let(:query) { %|
    mutation {
      createPayment(input: {
        projectId: "#{project.airtable_id}",
        source: "#{source.id}",
        amount: #{amount}
      }) {
        payment {
          id
          status
        }
        errors {
          code
        }
      }
    }
  |}

  let(:source) { double(Stripe::Source, id: "src", status: "chargeable") }
  let(:amount) { 100_00 }

  before :each do
    allow(Stripe::Source).to receive(:retrieve).with("src").and_return(source)
    charge = double(Stripe::Charge, id: "chg_123")
    allow(Stripe::Charge).to receive(:create).and_return(charge)
    allow_any_instance_of(Project).to receive(:sync_to_airtable)
  end

  it "captures the payment" do
    response = AdvisableSchema.execute(query)
    status = response["data"]["createPayment"]["payment"]["status"]
    expect(status).to eq("captured")
  end

  it "updates the project deposit_paid" do
    expect {
      AdvisableSchema.execute(query)
    }.to change {
      project.reload.deposit_paid
    }.from(0).to(100_00)
  end

  context "when the source is is canceled" do
    let(:source) { double(Stripe::Source, id: "src", status: "canceled") }

    it "returns an error" do
      response = AdvisableSchema.execute(query)
      error = response["data"]["createPayment"]["errors"][0]
      expect(error["code"]).to eq("source_not_chargeable")
    end
  end

  context "when the source is is failed" do
    let(:source) { double(Stripe::Source, id: "src", status: "failed") }

    it "returns an error" do
      response = AdvisableSchema.execute(query)
      error = response["data"]["createPayment"]["errors"][0]
      expect(error["code"]).to eq("source_not_chargeable")
    end
  end

  context "when the source is is consumed" do
    let(:source) { double(Stripe::Source, id: "src", status: "consumed") }

    it "returns an error" do
      response = AdvisableSchema.execute(query)
      error = response["data"]["createPayment"]["errors"][0]
      expect(error["code"]).to eq("source_not_chargeable")
    end
  end

  context "when the amount exceeds the amount owed" do
    let(:project) { create(:project, deposit: 100_00, deposit_paid: 50_00 ) }
    let(:amount) { 100_00 }

    it "returns an error" do
      response = AdvisableSchema.execute(query)
      error = response["data"]["createPayment"]["errors"][0]
      expect(error["code"]).to eq("Payment amount exceeds deposit amount")
    end
  end

  context "when stripe raises an error" do
    before :each do
      error = Stripe::StripeError.new(code: "stripe_error_code")
      allow(Stripe::Charge).to receive(:create).and_raise(error)
    end

    it "sets the status to failed" do
      response = AdvisableSchema.execute(query)
      status = response["data"]["createPayment"]["payment"]["status"]
      expect(status).to eq("failed")
      payment = Payment.last
      expect(payment.error_code).to eq("stripe_error_code")
    end
  end
end