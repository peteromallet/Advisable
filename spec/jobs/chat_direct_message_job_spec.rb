require "rails_helper"

RSpec.describe ChatDirectMessageJob do
  let(:recipient) { create(:specialist, :guild) }
  let(:sender) { create(:specialist, :guild) }
  let(:guild_post) { create(:guild_post, specialist: recipient) }
  let(:twilio_double) { instance_double(TwilioChat::Client, identity: "sender-123") }
  let(:other) {
    instance_double(Twilio::REST::Chat::V2::ServiceContext::UserInstance, identity: recipient.uid)
  }
  let(:message) { "this is a new chat message" }
  let(:channel) { double('channel', sid: 'channel-123') }

  context "when creating a 1:1 direct message" do
    subject(:enqueued_job) {
      described_class.perform_now(
        recipient_uid: recipient.uid,
        sender_uid: sender.uid,
        message: message,
        guild_post_id: guild_post.id
      )
    }

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

    context "when its a new channel" do
      before do
        allow(channel).to receive_message_chain("members.create")
        allow(channel).to receive(:members_count).and_return(0)
        allow(other).to receive(:is_online).and_return(true)
      end

      it "records a post engagement" do
        expect { enqueued_job }.to change { guild_post.reload.engagements_count }.by(1).
          and change { Guild::PostEngagement.count }.by(1)
      end

      it "does not record additional post engagements from the same specialist" do
        guild_post.engagements.create(specialist: sender)
        expect {
          enqueued_job
          guild_post.reload
        }.not_to change(guild_post, :engagements_count)
      end

      describe "with calendly link" do
        let(:guild_calendly_link) { "https://www.calendly.com/yoda/15min" }
        let(:message_job) {
          described_class.perform_now(
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

        it "saves the calendly link" do
          expect {
            message_job
            sender.reload
          }.to change(sender, :guild_calendly_link).from(nil).to(guild_calendly_link)
        end
      end
    end

    it "sends an email after creating the message if the recipient if offline" do
      chat_mailer = double('guild chat mailer')
      expect(chat_mailer).to receive(:deliver_later)

      allow(channel).to receive(:members_count).and_return(2)
      allow(other).to receive(:is_online).and_return(false)
      allow(Guild::ChatMailer).to receive(:new_message) { chat_mailer }
      enqueued_job
    end
  end
end
