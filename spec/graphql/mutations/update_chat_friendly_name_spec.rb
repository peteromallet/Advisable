require 'rails_helper'

RSpec.describe Mutations::Guild::CreateChatDirectMessage do
  let(:specialist) { create(:specialist, :guild) }
  let(:response_keys) { %w[updateChatFriendlyName chatChannel] }
  let(:channel_sid) { "channel-123" }

  let(:query) {
    <<-GRAPHQL
    mutation {
      updateChatFriendlyName(input: {
        channelSid: "#{channel_sid}"
      }) {
        chatChannel {
          friendlyName
        }
      }
    }
    GRAPHQL
  }

  context "with a guild specialist" do
    let(:twilio_double) { instance_double(TwilioChat::Client, identity: "sender-123") }

    before do
      allow(TwilioChat::Client).to receive(:new).with(any_args) { twilio_double }
      allow(twilio_double).to receive(:update_friendly_name!)
    end

    subject(:update_chat_friendly_name) do
      resp = AdvisableSchema.execute(query, context: {current_user: specialist})
      resp.dig("data", *response_keys)
    end

    it "utilizes a service that uses twilio to update the channel friendly name" do
      expect(Chat::FriendlyNameService).to receive(:call).
        with({
          channel_sid: channel_sid,
          identity: specialist.uid
        })
      subject
    end
  end
end
