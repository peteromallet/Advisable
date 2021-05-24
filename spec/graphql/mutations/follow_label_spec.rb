# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::FollowLabel do
  subject(:follow_label) { response.dig("data", "followLabel", "label") }

  let(:label) { create(:label) }
  let(:specialist) { create(:specialist, :guild) }
  let(:context) { {current_user: specialist} }
  let(:response) { AdvisableSchema.execute(query, context: context) }

  let(:query) do
    <<-GRAPHQL
    mutation {
      followLabel(input: {
        labelSlug: "#{label.slug}"
      }) {
        label {
          id
        }
      }
    }
    GRAPHQL
  end

  it "adds a label to the specialist's subscriptions" do
    expect(specialist.subscriptions.count).to eq(0)
    follow_label
    expect(specialist.subscriptions.count).to eq(1)
    expect(specialist.subscriptions.first.label).to eq(label)
  end

  it "does not follow a label thats already followed" do
    specialist.subscribe_to!(label)

    expect(specialist.subscriptions.count).to eq(1)
    follow_label
    expect(specialist.subscriptions.count).to eq(1)
    expect(specialist.subscriptions.first.label).to eq(label)
  end

  context "when a non-guild specialist" do
    let(:specialist) { create(:specialist) }
    let(:context) { {current_user: specialist} }

    it "throws an error" do
      expect(response["errors"].first.dig("extensions", "code")).to eq("INVALID_PERMISSIONS")
    end
  end

  context "when a user" do
    let(:user) { create(:user) }
    let(:context) { {current_user: user} }

    it "throws an error" do
      expect(response["errors"].first.dig("extensions", "code")).to eq("MUST_BE_SPECIALIST")
    end
  end
end
