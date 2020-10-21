require "rails_helper"

RSpec.describe ChatDirectMessageJob do
  let(:guild_post) { create(:guild_post) }
  let(:recipient) { build(:specialist, :guild) }
  let(:sender) { build(:specialist, :guild) }
  let(:twilio_double) { instance_double(TwilioChat::Client, identity: "sender-123") }
  let(:other) {
    instance_double(Twilio::REST::Chat::V2::ServiceContext::UserInstance, identity: recipient.uid)
  }
  let(:message) { "this is a new chat message" }
  let(:channel) { double('channel', sid: 'channel-123') }

  context "when creating a 1:1 direct message" do
    before do
      allow(TwilioChat::Client).to receive(:new).with(any_args) { twilio_double }
      allow(twilio_double).to receive(:find_or_create_channel).
        with({
          recipient_uid: recipient.uid,
          sender_uid: sender.uid,
          message: message
        }) { channel }
      allow(twilio_double).to receive(:fetch_user) { other }
      allow(channel).to receive_message_chain("messages.create")
    end

    subject(:enqueued_job) {
      ChatDirectMessageJob.perform_now(
        recipient_uid: recipient.uid,
        sender_uid: sender.uid,
        message: message,
        guild_post_id: guild_post.id
      )
    }

    context "when its a new channel" do
      before do
        allow(channel).to receive_message_chain("members.create")
        allow(channel).to receive(:members_count) { 0 }
        allow(other).to receive(:is_online) { true }
      end

      it "records a new engagment" do
        expect { subject }.to change { guild_post.reload.engagements_count }.by(1)
      end

      describe "with calendly link" do
        let(:guild_calendly_link) { "https://www.calendly.com/yoda/15min" }
        let(:message_job) {
          ChatDirectMessageJob.perform_now(
            recipient_uid: recipient.uid,
            sender_uid: sender.uid,
            message: message,
            guild_post_id: guild_post.id,
            guild_calendly_link: guild_calendly_link
          )
        }

        it "modifies the message with a calendly link and a context prefix" do
          offer_help_prefix = "Offering help for '#{guild_post.title}':\n\n "

          expect(channel).to receive_message_chain("messages.create").with(
            {
              attributes: {calendly_link: guild_calendly_link}.to_json,
              body: offer_help_prefix + message,
              from: sender.uid
            }
          )
          message_job
        end
      end
    end

    it "sends an email after creating the message if the recipient if offline" do
      chat_mailer = double('guild chat mailer')
      expect(chat_mailer).to receive(:deliver_later)

      expect(channel).to receive(:members_count) { 2 }
      expect(other).to receive(:is_online) { false }
      expect(Guild::ChatMailer).to receive(:new_message) { chat_mailer }
      subject
    end
  end
end
