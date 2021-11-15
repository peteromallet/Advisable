# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::PostCollaborationRequest do
  let(:specialist) { create(:specialist) }
  let(:current_user) { specialist }
  let(:context) { {current_user: current_user} }
  let(:labels) { create_list(:label, 3) }

  let(:query) do
    <<-GRAPHQL
    mutation {
      postCollaborationRequest(input: {
        body: "#{Faker::Lorem.paragraph}",
        labels: #{labels.map(&:name)},
        shareable: true,
        title: "#{Faker::Lorem.sentence}"
      }) {
        post {
          id
        }
      }
    }
    GRAPHQL
  end

  context "with an accpted specialist" do
    it "creates a new collaboration request" do
      response = AdvisableSchema.execute(query, context: context)
      id = response.dig("data", "postCollaborationRequest", "post", "id")
      post = Guild::Post.find(id)
      expect(post.attributes).to include({
        "type" => "Opportunity",
        "status" => "published",
        "specialist_id" => specialist.id,
        "shareable" => true
      })
    end
  end

  context "when no user is logged in" do
    let(:current_user) { nil }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["errors"][0]["extensions"]["code"]
      expect(error).to eq("notAuthenticated")
    end
  end

  context "when the current user is a user" do
    let(:current_user) { create(:user) }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["errors"][0]["extensions"]["code"]
      expect(error).to eq("MUST_BE_SPECIALIST")
    end
  end

  context "when the current user is a non-accepted specialist" do
    let(:current_user) { create(:specialist, application_stage: "Rejected By Us") }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["errors"][0]["extensions"]["code"]
      expect(error).to eq("MUST_BE_ACCEPTED_SPECIALIST")
    end
  end
end
