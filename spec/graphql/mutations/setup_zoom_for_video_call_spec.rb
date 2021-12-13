# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::SetupZoomForVideoCall do
  let(:video_call) { create(:video_call, fallback: false) }
  let(:current_user) { create(:user) }

  let(:query) do
    <<-GRAPHQL
    mutation {
      setupZoomForVideoCall(input: {
        id: "#{video_call.uid}",
      }) {
        videoCall {
          id
        }
      }
    }
    GRAPHQL
  end

  let(:request) do
    AdvisableSchema.execute(query, context: {current_user: current_user})
  end

  it "converts a video call for zoom" do
    expect { request }.to(change { video_call.reload.fallback }.from(false).to(true))
  end

  context "when no viewer is authenticated" do
    let(:current_user) { nil }

    it "returns an error" do
      code = request["errors"].first["extensions"]["code"]
      expect(code).to eq("NOT_AUTHENTICATED")
    end
  end
end
