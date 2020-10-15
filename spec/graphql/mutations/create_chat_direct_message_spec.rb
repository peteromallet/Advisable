require 'rails_helper'

RSpec.describe Mutations::Guild::CreateChatDirectMessage do
  let(:chat_participants) { build_list(:specialist, 2, :guild) }
  let(:response_keys) { %w[createChatDirectMessage enqueued] }
  let(:guild_post) { create(:guild_post) }

  let(:query) {
    <<-GRAPHQL
    mutation {
      createChatDirectMessage(input: {
        recipientId: "#{chat_participants.last.uid}",
        body: "this is a message",
        guildPostId: "#{guild_post.id}",
      }) {
        enqueued
      }
    }
    GRAPHQL
  }

  it_behaves_like "guild specialist"

  context "with a guild specialist" do
    let(:sender) { chat_participants.first }
    let(:recipient) { chat_participants.last }

    subject(:new_chat_message) do
      resp = AdvisableSchema.execute(query, context: {current_user: sender})
      resp.dig("data", *response_keys)
    end

    it "starts a new direct chat message conversation" do
      expect(ChatDirectMessageJob).to receive(:perform_later).
        with({
          message: "this is a message",
          recipient_uid: recipient.uid,
          sender_uid: sender.uid,
          guild_post_id: guild_post.id,
          guild_calendly_link: nil,
        })
      expect(subject).to eq(true)
    end
  end
end