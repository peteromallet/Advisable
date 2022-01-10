# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::ToggleTeamManager do
  let(:user) { create(:user, :team_manager) }
  let(:context) { {current_user: user} }
  let(:target_user) { create(:user) }

  let(:query) do
    <<-GRAPHQL
    mutation {
      toggleTeamManager(input: {
        userId: "#{target_user.uid}",
      }) {
        user {
          id
          isTeamManager
        }
      }
    }
    GRAPHQL
  end

  it "turns on team manager permission" do
    response = AdvisableSchema.execute(query, context:)
    target_user_response = response["data"]["toggleTeamManager"]["user"]
    target_user = User.find_by(uid: target_user_response["id"])

    expect(target_user_response["isTeamManager"]).to be_truthy
    expect(target_user.account).to be_team_manager
  end

  context "when existing permission" do
    let(:target_user) { create(:user, :team_manager) }

    it "turns off team manager permission" do
      response = AdvisableSchema.execute(query, context:)
      target_user_response = response["data"]["toggleTeamManager"]["user"]
      target_user = User.find_by(uid: target_user_response["id"])

      expect(target_user_response["isTeamManager"]).to be_falsey
      expect(target_user.account).not_to be_team_manager
    end
  end

  context "when no team manager permission" do
    let(:user) { create(:user) }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context:)
      error = response["errors"].first["extensions"]["code"]
      expect(error).to eq("MUST_BE_TEAM_MANAGER")
    end
  end
end
