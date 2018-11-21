require "rails_helper"

describe Payments::Create do
  let(:project) { Project.new(deposit: 100_00) }

  context "when the source is chargeable" do
    before :each do
      source = double(Stripe::Source, status: "chargeable")
      expect(Stripe::Source).to receive(:retrieve).with("src_123").and_return(source)
    end

    it "calls the Payments::Charge service" do
      expect(Payments::Charge).to receive(:call)
      Payments::Create.call(project: project, amount: 100_00, source_id: "src_123")
    end

    it "returns a payment" do
      allow(Payments::Charge).to receive(:call)
      response = Payments::Create.call(project: project, amount: 100_00, source_id: "src_123")
      expect(response).to be_a(Payment)
    end
  end

  context "when the source is canceled" do
    it "raises an error" do
      source = double(Stripe::Source, status: "canceled")
      expect(Stripe::Source).to receive(:retrieve).with("src_123").and_return(source)
      expect {
        Payments::Create.call(project: project, amount: 100_00, source_id: "src_123")
      }.to raise_error(Service::Error)
    end
  end

  context "when the source is failed" do
    it "raises an error" do
      source = double(Stripe::Source, status: "failed")
      expect(Stripe::Source).to receive(:retrieve).with("src_123").and_return(source)
      expect {
        Payments::Create.call(project: project, amount: 100_00, source_id: "src_123")
      }.to raise_error(Service::Error)
    end
  end

  context "when the source is consumed" do
    it "raises an error" do
      source = double(Stripe::Source, status: "consumed")
      allow(Stripe::Source).to receive(:retrieve).with("src_123").and_return(source)
      expect {
        Payments::Create.call(project: project, amount: 100_00, source_id: "src_123")
      }.to raise_error(Service::Error)
    end
  end

  context "when the amount exceeds the deposit owed" do
    it "throws a Service::Error" do
      source = double(Stripe::Source, status: "chargeable")
      expect(Stripe::Source).to receive(:retrieve).with("src_123").and_return(source)

      expect {
        Payments::Create.call(project: project, amount: 200_00, source_id: "src_123")
      }.to raise_error(Service::Error, /exceeds deposit amount/)
    end
  end
end