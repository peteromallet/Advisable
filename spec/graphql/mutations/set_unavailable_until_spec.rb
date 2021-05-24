# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::SetUnavailableUntil do
  let(:current_user) { create(:specialist, unavailable_until: 2.days.from_now) }
  let(:context) { {current_user: current_user} }
  let(:params) { "clear: true" }

  let(:query) do
    <<-GRAPHQL
    mutation {
      setUnavailableUntil(input: {
        #{params}
      }) {
        specialist {
          id
        }
      }
    }
    GRAPHQL
  end

  it "clears the date" do
    AdvisableSchema.execute(query, context: context)
    expect(Specialist.find(current_user.id).unavailable_until).to be_nil
  end

  context "when date in the future" do
    let(:params) { "date: \"#{4.days.from_now.strftime('%Y-%m-%d')}\"" }

    it "Update the specialists unavailable_until date" do
      AdvisableSchema.execute(query, context: context)
      expect(Specialist.find(current_user.id).unavailable_until).to eq(4.days.from_now.to_date)
    end
  end

  context "when date in the past" do
    let(:params) { "date: \"#{2.days.ago.strftime('%Y-%m-%d')}\"" }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["errors"][0]
      expect(error["extensions"]["code"]).to eq("INVALID_DATE")
    end
  end

  context "when there is no user" do
    let(:context) { {current_user: nil} }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["errors"][0]
      expect(error["extensions"]["code"]).to eq("notAuthenticated")
    end
  end

  context "when the user is not specialist" do
    let(:current_user) { create(:user) }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["errors"][0]
      expect(error["extensions"]["code"]).to eq("MUST_BE_SPECIALIST")
    end
  end
end
