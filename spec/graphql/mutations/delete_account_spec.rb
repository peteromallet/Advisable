# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::DeleteAccount do
  let(:user) { create(:specialist) }
  let(:account) { user.account }
  let(:context) { {current_user: user, session_manager:} }
  let(:session_manager) { instance_spy(SessionManager) }
  let(:query) do
    <<-GRAPHQL
    mutation {
      deleteAccount(input: {}) {
        status
      }
    }
    GRAPHQL
  end

  it "marks the specialist's account for deletion" do
    AdvisableSchema.execute(query, context:)
    expect(AirtableSyncJob).to have_been_enqueued.with(user, anything)
    expect(account.deleted_at).not_to be_nil
  end

  context "when user" do
    let(:user) { create(:user) }

    it "marks account for deletion" do
      AdvisableSchema.execute(query, context:)
      expect(AirtableSyncJob).to have_been_enqueued.with(user, anything)
      expect(account.deleted_at).not_to be_nil
    end
  end
end
