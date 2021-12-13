# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::UpdateAvailability do
  let(:user) { create(:user, availability: []) }
  let(:current_user) { user }
  let(:context) { {current_user: current_user} }
  let(:time) { 2.days.from_now.utc.iso8601 }

  let(:query) do
    <<-GRAPHQL
    mutation {
      updateAvailability(input: {
        availability: ["#{time}"]
      }) {
        user {
          id
          availability
        }
      }
    }
    GRAPHQL
  end

  it "updates the users availability" do
    expect(user.reload.availability).to be_empty
    response = AdvisableSchema.execute(query, context: context)
    availability = response["data"]["updateAvailability"]["user"]["availability"]
    expect(availability).to include(time)
  end

  context "when no user is logged in" do
    let(:current_user) { nil }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["errors"][0]["extensions"]["code"]
      expect(error).to eq("NOT_AUTHENTICATED")
    end
  end

  context "when the current user is a user" do
    let(:current_user) { create(:specialist) }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["errors"][0]["extensions"]["code"]
      expect(error).to eq("MUST_BE_USER")
    end
  end
end
