# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::UpdateAvailability do
  let(:account) { create(:account, availability: []) }
  let(:user) { create(:user, account:) }
  let(:current_user) { user }
  let(:context) { {current_user:} }
  let(:time) { 2.days.from_now.utc.iso8601 }

  let(:query) do
    <<-GRAPHQL
    mutation {
      updateAvailability(input: {
        availability: ["#{time}"]
      }) {
        viewer {
          id
          availability
        }
      }
    }
    GRAPHQL
  end

  it "updates the users availability" do
    expect(user.reload.availability).to be_empty
    response = AdvisableSchema.execute(query, context:)
    availability = response["data"]["updateAvailability"]["viewer"]["availability"]
    expect(availability).to include(time)
  end

  context "when no user is logged in" do
    let(:current_user) { nil }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context:)
      error = response["errors"][0]["extensions"]["code"]
      expect(error).to eq("NOT_AUTHENTICATED")
    end
  end

  context "when the current user is a user" do
    let(:current_user) { create(:specialist) }

    it "updates the specialists availability" do
      expect(user.reload.availability).to be_empty
      response = AdvisableSchema.execute(query, context:)
      availability = response["data"]["updateAvailability"]["viewer"]["availability"]
      expect(availability).to include(time)
    end
  end
end
