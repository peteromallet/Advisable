# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::ApprovePaymentRequest do
  let(:company) { create(:company, stripe_payment_method: "asdf1234") }
  let(:current_user) { create(:user, company:) }
  let(:payment_request) { create(:payment_request, amount: 30000, company:) }

  let(:query) do
    <<-GRAPHQL
      mutation {
        approvePaymentRequest(input: {
          paymentRequest: "#{payment_request.uid}",
        }) {
          paymentRequest {
            id
          }
        }
      }
    GRAPHQL
  end

  let(:context) { {current_user:} }

  before { allow(Stripe::PaymentIntent).to receive(:create).and_return(OpenStruct.new(id: "pi_#{SecureRandom.uuid}", status: "succeeded")) }

  it "sets the status to paid" do
    expect(payment_request.reload.status).to eq("pending")
    AdvisableSchema.execute(query, context:)
    expect(payment_request.reload.status).to eq("paid")
  end

  it "creates a payment" do
    count = Payment.count
    AdvisableSchema.execute(query, context:)
    expect(Payment.count).to eq(count + 1)
    expect(Payment.last.attributes).to include("amount" => 30000, "admin_fee" => 1500, "status" => "succeeded", "company_id" => payment_request.company_id, "payment_request_id" => payment_request.id)
  end

  it "returns a payment" do
    expect(payment_request.reload.payment).to be_nil
    response = AdvisableSchema.execute(query, context:)
    uid = response.dig("data", "approvePaymentRequest", "paymentRequest", "id")
    payment = PaymentRequest.find_by(uid:).payment
    expect(payment).to eq(payment_request.reload.payment)
  end

  context "when the user doesn't have access to the request" do
    let(:context) { {current_user: create(:user)} }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context:)
      error = response["errors"][0]["extensions"]["code"]
      expect(error).to eq("NOT_AUTHORIZED")
    end
  end

  context "when there is no user" do
    let(:context) { {current_user: nil} }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context:)
      error = response["errors"][0]["extensions"]["code"]
      expect(error).to eq("NOT_AUTHORIZED")
    end
  end

  context "when the specialist is logged in" do
    let(:context) { {current_user: payment_request.specialist} }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context:)
      error = response["errors"][0]["extensions"]["code"]
      expect(error).to eq("NOT_AUTHORIZED")
    end
  end

  context "when the request status is not pending" do
    let(:payment_request) { create(:payment_request, status: "approved") }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context:)
      error = response["errors"][0]["message"]
      expect(error).to eq("You do not have permission to approve this payment request")
    end
  end
end
