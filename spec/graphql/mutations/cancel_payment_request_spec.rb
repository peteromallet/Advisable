# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::CancelPaymentRequest do
  let(:company) { create(:company) }
  let(:user) { create(:user, company:) }
  let(:payment_request) { create(:payment_request, amount: 30000, company:) }

  let(:query) do
    <<-GRAPHQL
      mutation {
        cancelPaymentRequest(input: {
          paymentRequest: "#{payment_request.uid}",
          reason: "I don't like this",
        }) {
          paymentRequest {
            id
          }
        }
      }
    GRAPHQL
  end

  let(:context) { {current_user: payment_request.specialist} }

  it "sets the status to canceled" do
    expect(payment_request.reload.status).to eq("pending")
    AdvisableSchema.execute(query, context:)
    expect(payment_request.reload.status).to eq("canceled")
  end

  it "returns a payment request" do
    expect(payment_request.reload.payment).to be_nil
    response = AdvisableSchema.execute(query, context:)
    uid = response.dig("data", "cancelPaymentRequest", "paymentRequest", "id")
    request = PaymentRequest.find_by(uid:)
    expect(request).to eq(payment_request)
    expect(request.status).to eq("canceled")
    expect(request.cancellation_reason).to eq("I don't like this")
    expect(request.payment).to be_nil
    expect(request.payout).to be_nil
  end

  context "when the user doesn't have access to the request" do
    let(:context) { {current_user: create(:specialist)} }

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

  context "when the user is logged in" do
    let(:context) { {current_user: payment_request.company.users.first} }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context:)
      error = response["errors"][0]["extensions"]["code"]
      expect(error).to eq("NOT_AUTHORIZED")
    end
  end

  context "when the request status is not pending" do
    let(:payment_request) { create(:payment_request, company:, status: "canceled") }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context:)
      error = response["errors"][0]["message"]
      expect(error).to eq("MUST BE PENDING OR DISPUTED")
    end
  end
end
