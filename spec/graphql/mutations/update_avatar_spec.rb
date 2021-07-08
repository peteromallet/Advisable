# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::UpdateAvatar do
  let(:context) { {current_user: current_user} }
  let(:file) { Rails.root.join("spec/support/test.pdf") }
  let(:signed_id) { ActiveStorage::Blob.create_and_upload!(io: File.open(file), filename: "test.pdf").signed_id }

  let(:query) do
    <<-GRAPHQL
      mutation {
        updateAvatar(input: {
          avatar: "#{signed_id}"
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

  before do
    allow_any_instance_of(User).to receive(:sync_to_airtable)
    allow_any_instance_of(Specialist).to receive(:sync_to_airtable)
  end

  context "when the current user is a user" do
    let(:current_user) { create(:user) }

    it "updates the avatar" do
      response = AdvisableSchema.execute(query, context: context)
      pp response
      id = response["data"]["updateAvatar"]["viewer"]["id"]
      expect(id).to eq(current_user.uid)
      expect(current_user.avatar.blob.signed_id).to eq(signed_id)
    end
  end

  context "when the current user is a specialist" do
    let(:current_user) { create(:specialist) }

    it "updates the avatar" do
      response = AdvisableSchema.execute(query, context: context)
      id = response["data"]["updateAvatar"]["viewer"]["id"]
      expect(id).to eq(current_user.uid)
      expect(current_user.avatar.blob.signed_id).to eq(signed_id)
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
end
