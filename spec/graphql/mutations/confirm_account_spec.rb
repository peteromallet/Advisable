# frozen_string_literal: true
require "rails_helper"

RSpec.describe Mutations::ConfirmAccount do
  let(:token) { Token.new }
  let(:input_token) { token }
  let(:digest) { Token.digest(token) }
  let(:account) { create(:account, confirmed_at: nil, confirmation_digest: digest) }
  let(:email) { account.email }
  let(:session_manager) do
    SessionManager.new(session: OpenStruct.new, cookies: OpenStruct.new)
  end

  let(:query) do
    <<-GRAPHQL
    mutation {
      confirmAccount(input: {
        email: "#{email}",
        token: "#{input_token}"
      }) {
        viewer {
          ... on User {
            id
            confirmed
          }
          ... on Specialist {
            id
            confirmed
          }
        }
      }
    }
    GRAPHQL
  end

  let(:response) do
    AdvisableSchema.execute(
      query,
      context: {session_manager: session_manager}
    )
  end

  before do
    allow(session_manager).to receive(:login)
    create(:user, account: account)
  end

  it "returns the viewer" do
    viewer = response["data"]["confirmAccount"]["viewer"]
    expect(viewer["confirmed"]).to be_truthy
  end

  it "confirms the account" do
    expect(account.reload.confirmed_at).to be_nil
    response
    expect(account.reload.confirmed_at).not_to be_nil
  end

  it "logs in the user" do
    response
    expect(session_manager).to have_received(:login).with(account)
  end

  context "when the account has already been confirmed" do
    let(:account) { create(:account, confirmation_digest: digest, confirmed_at: 2.hours.ago) }

    it "does not update the confirmed_at timestamp" do
      expect { response }.not_to(change { account.reload.confirmed_at })
    end

    it "does not return any errors" do
      expect(response["errors"]).to be_nil
    end

    it "authenticates the user" do
      response
      expect(session_manager).to have_received(:login).with(account)
    end
  end

  context "when the token is invalid" do
    let(:input_token) { Token.new }

    it "returns an error" do
      error = response["errors"][0]
      expect(error["extensions"]["code"]).to eq("INVALID_CONFIRMATION_TOKEN")
    end

    it "does not login the user" do
      response
      expect(session_manager).not_to have_received(:login)
    end
  end
end
