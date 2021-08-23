# frozen_string_literal: true

require "rails_helper"

RSpec.describe MessagesRepliesMailbox do
  let(:conversation) { create(:conversation) }
  let(:destination) { "#{conversation.uid}@#{ENV["MESSAGE_REPLIES_DOMAIN"]}" }
  let(:account) { create(:account) }

  it "parses emails sent to correct destionation" do
    expect(described_class).to receive_inbound_email(to: destination)
  end

  context "when account is a participant" do
    before { conversation.participants.create!(account: account) }

    it "creates a message in conversation" do
      mail = Mail.new(
        from: account.email,
        to: destination,
        body: "This is a test message"
      )
      mail_processed = process(mail)

      expect(mail_processed).to have_been_delivered
      expect(conversation.messages.pluck(:content)).to include("This is a test message")
    end
  end

  context "when account is not a participant" do
    it "creates a message in conversation" do
      mail = Mail.new(
        from: account.email,
        to: destination,
        body: "This is a test message"
      )
      mail_processed = process(mail)

      expect(mail_processed).to have_been_delivered
      expect(conversation.messages.pluck(:content)).not_to include("This is a test message")
    end
  end
end
