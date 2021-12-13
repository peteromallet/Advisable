# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::CreateAgreement do
  let(:specialist) { create(:specialist) }
  let(:user) { create(:user) }
  let(:context) { {current_user: specialist, current_account: specialist.account} }
  let(:response) { AdvisableSchema.execute(query, context: context) }

  let(:query) do
    <<-GRAPHQL
    mutation {
      createAgreement(input: {
        collaboration: "fixed",
        invoicing: "upfront",
        user: "#{user&.uid}"
      }) {
        agreement {
          id
        }
      }
    }
    GRAPHQL
  end

  context "when a specialist is signed in" do
    it "creates a new agreement" do
      id = response["data"]["createAgreement"]["agreement"]["id"]
      agreement = Agreement.with_log_data.find_by!(uid: id)
      expect(agreement.user).to eq(user)
      expect(agreement.company).to eq(user.company)
      expect(agreement.specialist).to eq(specialist)
      expect(agreement.collaboration).to eq("fixed")
      expect(agreement.invoicing).to eq("upfront")
      expect(agreement.status).to eq("pending")
      expect(agreement.log_data.responsible_id).to eq(specialist.account_id)
    end
  end

  context "when the user does not exist" do
    let(:user) { nil }

    it "responds with not found error code" do
      error = response["errors"][0]
      expect(error["extensions"]["code"]).to eq("NOT_FOUND")
    end
  end

  context "when the user is signed in" do
    let(:context) { {current_user: user} }

    it "responds with must be specialist error code" do
      error = response["errors"][0]
      expect(error["extensions"]["code"]).to eq("MUST_BE_SPECIALIST")
    end
  end

  context "when there is no user signed in" do
    let(:context) { {current_user: nil} }

    it "responds with not authenticated error code" do
      error = response["errors"][0]
      expect(error["extensions"]["code"]).to eq("NOT_AUTHENTICATED")
    end
  end
end
