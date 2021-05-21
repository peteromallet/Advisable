# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::UnfollowLabel do
  subject(:unfollow_label) { response.dig("data", "unfollowLabel", "label") }

  let(:label) { create(:label) }
  let(:another_label) { create(:label) }

  let(:specialist) { create(:specialist, :guild) }
  let(:context) { {current_user: specialist} }
  let(:response) { AdvisableSchema.execute(query, context: context) }

  let(:query) do
    <<-GRAPHQL
    mutation {
      unfollowLabel(input: {
        labelSlug: "#{label.slug}"
      }) {
        label {
          id
        }
      }
    }
    GRAPHQL
  end

  it "removes a label from the specialist's subscriptions" do
    specialist.subscribe_to!(label)

    expect(specialist.subscriptions.count).to eq(1)
    unfollow_label
    expect(specialist.subscriptions.count).to eq(0)
  end

  it "does not unfollow a label that is not followed" do
    specialist.subscribe_to!(label)
    specialist.subscribe_to!(another_label)

    expect(specialist.subscriptions.count).to eq(2)
    unfollow_label
    expect(specialist.subscriptions.count).to eq(1)
    expect(specialist.subscriptions.first.label).to eq(another_label)
  end

  it "handles unfollowing of a non-followed label" do
    expect(specialist.subscriptions.count).to eq(0)
    unfollow_label
    expect(specialist.subscriptions.count).to eq(0)
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
