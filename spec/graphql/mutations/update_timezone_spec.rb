# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::UpdateTimezone do
  let(:context) { {current_user:, current_account: current_user&.account} }

  let(:query) do
    <<-GRAPHQL
      mutation {
        updateTimezone(input: {
          timezone: "Berlin"
        }) {
          viewer {
            ... on User {
              id
            }
            ... on Specialist {
              id
            }
          }
        }
      }
    GRAPHQL
  end

  context "when the current user is a user" do
    let(:current_user) { create(:user) }

    it "updates the timezone" do
      expect(current_user.account.timezone).not_to eq("Berlin")
      response = AdvisableSchema.execute(query, context:)
      id = response["data"]["updateTimezone"]["viewer"]["id"]
      expect(id).to eq(current_user.uid)
      expect(current_user.account.timezone).to eq("Berlin")
    end
  end

  context "when the current user is a specialist" do
    let(:current_user) { create(:specialist) }

    it "updates the timezone" do
      expect(current_user.account.timezone).not_to eq("Berlin")
      response = AdvisableSchema.execute(query, context:)
      id = response["data"]["updateTimezone"]["viewer"]["id"]
      expect(id).to eq(current_user.uid)
      expect(current_user.account.timezone).to eq("Berlin")
    end
  end

  context "when no user is logged in" do
    let(:current_user) { nil }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context:)

      error = response["errors"][0]["extensions"]["code"]
      expect(error).to eq("NOT_AUTHENTICATED")
    end
  end
end
