require 'rails_helper'

RSpec.describe WebhooksController do
  ENV['TWILIO_SID'] = "123"

  let(:specialist) { build(:specialist, :guild) }
  let(:twilio_payload) {
    {
      "AccountSid" => ENV['TWILIO_SID'],
      "EventType" => "onMessageSent",
      "ClientIdentity" => specialist.uid,
      "ChannelSid" => "channel-sid-123",
    }
  }

  describe "twilio_chat" do
    subject(:payload) {
      URI.encode_www_form(twilio_payload.to_a)
    }

    it "returns unauthorized if the account sid is invalid" do
      body = URI.encode_www_form(
        twilio_payload.merge!({"AccountSid" => "invalid"}).to_a
      )
      post :twilio_chat, body: body
      expect(response.status).to eq(401)
      expect(JSON.parse(response.body)).to eq({})
    end

    it "skips processing if the event is not onMessageSent" do
      body = URI.encode_www_form(
        twilio_payload.merge!({"EventType" => "invalidType"}).to_a
      )
      post :twilio_chat, body: body
      expect(TwilioChat::Client).to_not receive(:new).with(any_args)
      expect(response.status).to eq(204)
    end

    describe "with valid onMessageSent events" do
      let(:twilio_double) { instance_double(TwilioChat::Client, identity: "sender-123") }

      let(:participant) {
        instance_double(
          Twilio::REST::Chat::V2::ServiceContext::UserInstance,
          identity: "recipient-123"
        )
      }

      before do
        allow(TwilioChat::Client).to receive(:new).with(any_args) { twilio_double }
        allow(twilio_double).to receive(:check_membership) { true }
        allow(twilio_double).to receive(:fetch_other_participant) { participant }
      end

      it "skips the new message emails if the recipient user is online" do
        expect(participant).to receive(:is_online) { true }
        post :twilio_chat, body: payload
        expect(Guild::ChatMailer).to_not receive(:new_message)
      end

      it "sends a new message email if the recipient user is not online" do
        chat_mailer = double('guild chat mailer')
        expect(chat_mailer).to receive(:deliver_later)
        expect(Guild::ChatMailer).to receive(:new_message) { chat_mailer }

        allow(participant).to receive(:is_online) { false }
        post :twilio_chat, body: payload
      end
    end
  end
end