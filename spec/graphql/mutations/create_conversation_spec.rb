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

  let(:context) { {current_user:, current_account:} }

  it "creates the conversation and message and tracks event" do
    response = AdvisableSchema.execute(query, context:)
    uids = response["data"]["createConversation"]["conversation"]["participants"].pluck("id")
    expect(uids).to match_array([current_account.uid, participant.uid])
    message = response["data"]["createConversation"]["message"]
    expect(message["content"]).to eq("This is the message content.")
    expect(message["author"]["id"]).to eq(current_account.uid)
    expect(AnalyticsTrackJob).to have_been_enqueued.with(current_account.uid, "Created Conversation", {accounts: match_array([current_user.account.uid, participant.uid])})
    expect(SlackMessageJob).not_to have_been_enqueued
  end

  context "when the conversation is between user and specialist" do
    let!(:specialist) { create(:specialist, account: participant) }

    it "sends a slack message" do
      AdvisableSchema.execute(query, context:)
      expect(SlackMessageJob).to have_been_enqueued.with(channel: "client_activity", text: "#{current_user.name_with_company} has connected with #{specialist.account.name} via messaging.").once
    end
  end

  context "when a conversation with the same participants already exists" do
    let(:conversation) { create(:conversation) }

    before do
      conversation.participants.create(account: current_account)
      conversation.participants.create(account: participant)
    end

    it "creates a message in that conversation and does not track event" do
      response = AdvisableSchema.execute(query, context:)
      expect(conversation.uid).to eq(response["data"]["createConversation"]["conversation"]["id"])
      uids = response["data"]["createConversation"]["conversation"]["participants"].pluck("id")
      expect(uids).to match_array([current_account.uid, participant.uid])
      message = response["data"]["createConversation"]["message"]
      expect(message["content"]).to eq("This is the message content.")
      expect(message["author"]["id"]).to eq(current_account.uid)
      expect(AnalyticsTrackJob).not_to have_been_enqueued
      expect(SlackMessageJob).not_to have_been_enqueued
    end
  end

  context "when impersonating a user" do
    let(:current_account) { create(:account) }

    it "creates the conversation and message and does not tracks event" do
      response = AdvisableSchema.execute(query, context:)
      uids = response["data"]["createConversation"]["conversation"]["participants"].pluck("id")
      expect(uids).to match_array([current_account.uid, participant.uid])
      message = response["data"]["createConversation"]["message"]
      expect(message["content"]).to eq("This is the message content.")
      expect(message["author"]["id"]).to eq(current_account.uid)
      expect(AnalyticsTrackJob).not_to have_been_enqueued
      expect(SlackMessageJob).not_to have_been_enqueued
    end
  end

  context "when participants sent in is same as current_account" do
    let(:participant) { current_account }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context:)
      error = response["errors"][0]
      expect(error["extensions"]["code"]).to eq("NO_PARTICIPANTS")
    end
  end

  context "when the current user is not logged in" do
    let(:current_user) { nil }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context:)
      error = response["errors"][0]
      expect(error["extensions"]["code"]).to eq("NOT_AUTHENTICATED")
    end
  end
end
