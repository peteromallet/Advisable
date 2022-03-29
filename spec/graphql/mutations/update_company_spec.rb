# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::UpdateCompany do
  let(:marketing) { create(:industry, name: "Marketing") }
  let(:user) { create(:user) }
  let(:context) { {current_user: user, current_account: user.account} }
  let(:response) { AdvisableSchema.execute(query, context:) }

  let(:query) do
    <<-GRAPHQL
    mutation {
      updateCompany(input: {
        businessType: "B2C",
        industry: "#{marketing.uid}",
        intent: "I need some special services",
        kind: "Individual Entrepreneur",
        name: "Michael's Company"
      }) {
        user {
          id
        }
      }
    }
    GRAPHQL
  end

  context "when a user is signed in" do
    it "accepts an agreement and creates a message" do
      id = response["data"]["updateCompany"]["user"]["id"]
      usr = User.find_by!(uid: id)
      company = usr.company
      expect(usr).to eq(user)
      expect(usr.company.reload_log_data.responsible_id).to eq(user.account_id)
      expect(company.business_type).to eq("B2C")
      expect(company.industry).to eq(marketing)
      expect(company.intent).to eq("I need some special services")
      expect(company.kind).to eq("Individual Entrepreneur")
      expect(company.name).to eq("Michael's Company")
    end
  end

  context "when a specialist is signed in" do
    let(:context) { {current_user: create(:specialist)} }

    it "responds with must be specialist error code" do
      error = response["errors"][0]
      expect(error["extensions"]["code"]).to eq("MUST_BE_USER")
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
