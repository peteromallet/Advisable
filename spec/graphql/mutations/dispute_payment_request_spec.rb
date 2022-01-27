# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::DisputePaymentRequest do
  let(:company) { create(:company) }
  let(:current_user) { create(:user, company:) }
  let(:payment_request) { create(:payment_request, amount: 30000, company:) }

  let(:query) do
    <<-GRAPHQL
      mutation {
        disputePaymentRequest(input: {
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

  it "sets the status to disputed" do
    expect(payment_request.reload.status).to eq("pending")
    AdvisableSchema.execute(query, context:)
    expect(payment_request.reload.status).to eq("disputed")
  end

  it "returns a payment request" do
    expect(payment_request.reload.payment).to be_nil
    response = AdvisableSchema.execute(query, context:)
    uid = response.dig("data", "disputePaymentRequest", "paymentRequest", "id")
    request = PaymentRequest.find_by(uid:)
    expect(request).to eq(payment_request)
    expect(request.reload.payment).to be_nil
    expect(request.reload.payout).to be_nil
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
    let(:payment_request) { create(:payment_request, status: "disputed") }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context:)
      error = response["errors"][0]["message"]
      expect(error).to eq("You do not have permission to dispute this payment request")
    end
  end
end
