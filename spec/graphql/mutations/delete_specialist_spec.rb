# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::DeleteSpecialist do
  let(:user) { create(:specialist) }
  let(:account) { user.account }
  let(:context) { {current_user: user, session_manager: session_manager} }
  let(:session_manager) { instance_spy(SessionManager) }
  let(:query) do
    <<-GRAPHQL
    mutation {
      deleteSpecialist(input: {}) {
        status
      }
    }
    GRAPHQL
  end

  it "marks the specialist's account for deletion and deletes magic links" do
    expect(user).to receive(:sync_to_airtable)
    AdvisableSchema.execute(query, context: context)
    expect(account.deleted_at).not_to be_nil
  end

  context "when user" do
    let(:user) { create(:user) }

    it "can not delete the answer" do
      response = AdvisableSchema.execute(query, context: context)
      expect(response["errors"].first["message"]).to eq("Current user must be a Specialist.")
    end
  end
end
