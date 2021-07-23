# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::SendMessage do
  let(:current_user) { create(:user) }
  let(:current_account) { current_user&.account }
  let(:conversation) { create(:conversation) }

  let(:query) do
    <<-GRAPHQL
    mutation {
      sendMessage(input: {
        conversation: "#{conversation.uid}",
        content: "This is the message content."
      }) {
        conversation {
          messages {
            nodes {
              content
              author {
                id
              }
            }
          }
        }
      }
    }
    GRAPHQL
  end

  let(:context) { {current_user: current_user, current_account: current_account} }

  before do
    create(:conversation_participant, account: current_user.account, conversation: conversation) if current_user
  end

  it "creates the message and updates last_read_at" do
    expect(conversation.participants.first.last_read_at).to be_nil

    response = AdvisableSchema.execute(query, context: context)
    messages = response["data"]["sendMessage"]["conversation"]["messages"]["nodes"]
    contents = messages.map { |message| message["content"] }
    authors = messages.map { |message| message["author"]["id"] }

    expect(contents).to include("This is the message content.")
    expect(authors).to include(current_user.account.uid)
    expect(conversation.participants.first.last_read_at).not_to be_nil
  end

  context "when the current user is not logged in" do
    let(:current_user) { nil }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["errors"][0]
      expect(error["extensions"]["code"]).to eq("notAuthorized")
    end
  end

  context "when the logged in user is not a participant" do
    let(:context) { {current_user: create(:user)} }

    it "returns an error" do
      response = AdvisableSchema.execute(query, context: context)
      error = response["errors"][0]
      expect(error["extensions"]["code"]).to eq("notAuthorized")
    end
  end

  context "when the logged in account is an admin" do
    let(:current_account) { create(:account, :admin) }

    it "creates the message but does not change last_read_at" do
      expect(conversation.participants.first.last_read_at).to be_nil

      response = AdvisableSchema.execute(query, context: context)
      messages = response["data"]["sendMessage"]["conversation"]["messages"]["nodes"]
      contents = messages.map { |message| message["content"] }
      authors = messages.map { |message| message["author"]["id"] }
      expect(contents).to include("This is the message content.")
      expect(authors).to include(current_account.uid)
      expect(conversation.participants.first.last_read_at).to be_nil
    end
  end
end
