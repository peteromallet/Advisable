# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::CreatePaymentRequest do
  let(:company) { create(:company) }
  let(:user) { create(:user, company:) }
  let(:specialist) { create(:specialist) }
  let(:current_user) { specialist }
  let(:agreement_status) { "accepted" }
  let(:agreement) { create(:agreement, user:, company:, specialist:, status: agreement_status) }
  let(:extra) { "" }
  let(:context) { {current_user:} }

  let(:query) do
    <<-GRAPHQL
      mutation {
        createPaymentRequest(input: {
          lineItems: [
            {description: "Hundo", amount: 10000},
            {description: "Two Hundo", amount: 20000}
          ],
          agreement: "#{agreement.uid}",
          #{extra}
        }) {
          paymentRequest {
            id
          }
        }
      }
    GRAPHQL
  end

  it "creates the payment request" do
    response = AdvisableSchema.execute(query, context:)
    id = response.dig("data", "createPaymentRequest", "paymentRequest", "id")
    payment_request = PaymentRequest.find_by!(uid: id)
    expect(payment_request.status).to eq("pending")
    expect(payment_request.specialist).to eq(specialist)
    expect(payment_request.company).to eq(company)
    expect(payment_request.line_items.count).to eq(2)
    expect(payment_request.line_items.first["description"]).to eq("Hundo")
    expect(payment_request.line_items.first["amount"]).to eq(10000)
    expect(payment_request.amount).to eq(30000)
    expect(payment_request.memo).to be_nil
  end

  it "sends an email to the company" do
    response = AdvisableSchema.execute(query, context:)
    id = response.dig("data", "createPaymentRequest", "paymentRequest", "id")
    payment_request = PaymentRequest.find_by!(uid: id)
    expect(ActionMailer::MailDeliveryJob).to have_been_enqueued.with("UserMailer", "payment_request", "deliver_now", {args: [payment_request]})
  end

  context "with memo" do
    let(:extra) { %(memo: "This is a memo") }

    it "saves the memo" do
      response = AdvisableSchema.execute(query, context:)
      id = response.dig("data", "createPaymentRequest", "paymentRequest", "id")
      payment_request = PaymentRequest.find_by!(uid: id)
      expect(payment_request.status).to eq("pending")
      expect(payment_request.memo).to eq("This is a memo")
    end
  end

  context "when there is no agreement" do
    let(:agreement) { instance_double("Agreement", uid: "1234") }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context:)
      error = response["errors"][0]["extensions"]["code"]
      expect(error).to eq("NOT_FOUND")
    end
  end

  context "when the agreement is pending" do
    let(:agreement_status) { "pending" }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context:)
      error = response["errors"][0]["extensions"]["code"]
      expect(error).to eq("NO_ACTIVE_AGREEMENT_WITH_THIS_COMPANY")
    end
  end

  context "when the agreement is declined" do
    let(:agreement_status) { "declined" }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context:)
      error = response["errors"][0]["extensions"]["code"]
      expect(error).to eq("NO_ACTIVE_AGREEMENT_WITH_THIS_COMPANY")
    end
  end

  context "when there is no user" do
    let(:context) { {current_user: nil} }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context:)
      error = response["errors"][0]["extensions"]["code"]
      expect(error).to eq("NOT_AUTHENTICATED")
    end
  end

  context "when the user is logged in" do
    let(:context) { {current_user: create(:user)} }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context:)
      error = response["errors"][0]["extensions"]["code"]
      expect(error).to eq("MUST_BE_SPECIALIST")
    end
  end
end
