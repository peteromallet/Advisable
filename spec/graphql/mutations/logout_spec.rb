# frozen_string_literal: true
require "rails_helper"

RSpec.describe Mutations::Logout do
  let(:current_user) { create(:user) }
  let(:session_manager) { instance_double(SessionManager) }
  let(:query) do
    <<-GRAPHQL
    mutation {
      logout(input: {}) {
        success
      }
    }
    GRAPHQL
  end

  let(:request) {
    AdvisableSchema.execute(query, context: {
      current_user: current_user,
      session_manager: session_manager
    })
  }

  before do
    allow(session_manager).to receive(:logout)
  end

  it "calls logout on the session manager" do
    request
    expect(session_manager).to have_received(:logout)
  end

  context "when no viewer is authenticated" do
    let(:current_user) { nil }

    it "returns an error" do
      code = request["errors"].first["extensions"]["code"]
      expect(code).to eq("notAuthenticated")
    end
  end
end
