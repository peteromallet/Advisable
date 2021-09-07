# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::CreateConversation do
  let(:current_user) { create(:user) }
  let(:current_account) { current_user&.account }
  let(:participant) { create(:account) }

  let(:query) do
    <<-GRAPHQL
    mutation {
      createConversation(input: {
        participants: ["#{participant.uid}"],
        content: "This is the message content."
      }) {
        conversation {
          id
          participants {
            id
          }
        }
        message {
          id
          content
          ... on UserMessage {
            author {
              id
            }
          }
        }
      }
    }
    GRAPHQL
  end

  let(:context) { {current_user: current_user, current_account: current_account} }

  it "creates the conversation and message" do
    response = AdvisableSchema.execute(query, context: context)
    uids = response["data"]["createConversation"]["conversation"]["participants"].pluck("id")
    expect(uids).to match_array([current_account.uid, participant.uid])
    message = response["data"]["createConversation"]["message"]
    expect(message["content"]).to eq("This is the message content.")
    expect(message["author"]["id"]).to eq(current_account.uid)
  end

  context "when a conversation with the same participants already exists" do
    let(:conversation) { create(:conversation) }

    before do
      conversation.participants.create(account: current_account)
      conversation.participants.create(account: participant)
    end

    it "creates a message in that conversation" do
      response = AdvisableSchema.execute(query, context: context)
      expect(conversation.uid).to eq(response["data"]["createConversation"]["conversation"]["id"])
      uids = response["data"]["createConversation"]["conversation"]["participants"].pluck("id")
      expect(uids).to match_array([current_account.uid, participant.uid])
      message = response["data"]["createConversation"]["message"]
      expect(message["content"]).to eq("This is the message content.")
      expect(message["author"]["id"]).to eq(current_account.uid)
    end
  end

  context "when participants sent in is same as current_account" do
    let(:participant) { current_account }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["errors"][0]
      expect(error["extensions"]["code"]).to eq("NO_PARTICIPANTS")
    end
  end

  context "when the current user is not logged in" do
    let(:current_user) { nil }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["errors"][0]
      expect(error["extensions"]["code"]).to eq("notAuthenticated")
    end
  end
end
