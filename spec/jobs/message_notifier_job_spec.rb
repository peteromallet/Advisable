# frozen_string_literal: true

require "rails_helper"

RSpec.describe MessageNotifierJob do
  let(:conversation) { create(:conversation) }
  let(:michael) { create(:conversation_participant, account: create(:account, first_name: "Michael")) }
  let(:dwight) { create(:conversation_participant, account: create(:account, first_name: "Dwight")) }
  let(:jim) { create(:conversation_participant, account: create(:account, first_name: "Jim")) }

  before { conversation.participants << [michael, dwight, jim] }

  it "sends the notification to everyone but the author" do
    message = create(:message, content: "Come to my office!", author: michael.account, conversation: conversation)
    described_class.new.perform(message)
    expect(ActionMailer::MailDeliveryJob).to have_been_enqueued.with("AccountMailer", "notify_of_new_messages", "deliver_now", {args: [dwight.account, [message.id]]})
    expect(ActionMailer::MailDeliveryJob).to have_been_enqueued.with("AccountMailer", "notify_of_new_messages", "deliver_now", {args: [jim.account, [message.id]]})
    expect(ActionMailer::MailDeliveryJob).not_to have_been_enqueued.with("AccountMailer", "notify_of_new_messages", "deliver_now", {args: [michael.account, [message.id]]})
  end

  context "when multiple messages were created" do
    it "only sends one email" do
      message1 = create(:message, content: "Come to my office!", author: michael.account, conversation: conversation, created_at: 5.seconds.ago)
      message2 = create(:message, content: "COME NOW!!!", author: michael.account, conversation: conversation, created_at: 2.seconds.ago)
      message3 = create(:message, content: "TWSS", author: michael.account, conversation: conversation)
      described_class.new.perform(message1)
      described_class.new.perform(message2)
      described_class.new.perform(message3)
      expect(ActionMailer::MailDeliveryJob).to have_been_enqueued.with("AccountMailer", "notify_of_new_messages", "deliver_now", {args: [dwight.account, [message1.id, message2.id, message3.id]]})
      expect(ActionMailer::MailDeliveryJob).to have_been_enqueued.with("AccountMailer", "notify_of_new_messages", "deliver_now", {args: [jim.account, [message1.id, message2.id, message3.id]]})
      expect(ActionMailer::MailDeliveryJob).not_to have_been_enqueued.with("AccountMailer", "notify_of_new_messages", "deliver_now", {args: [michael.account, any_args]})
    end

    it "sends only new non-participant emails" do
      message1 = create(:message, content: "Come to my office!", author: michael.account, conversation: conversation, created_at: 5.seconds.ago)
      message2 = create(:message, content: "Yes, Michael!", author: dwight.account, conversation: conversation, created_at: 2.seconds.ago)
      message3 = create(:message, content: "JIM???", author: michael.account, conversation: conversation)
      described_class.new.perform(message1)
      described_class.new.perform(message2)
      described_class.new.perform(message3)
      expect(ActionMailer::MailDeliveryJob).to have_been_enqueued.with("AccountMailer", "notify_of_new_messages", "deliver_now", {args: [dwight.account, [message3.id]]})
      expect(ActionMailer::MailDeliveryJob).to have_been_enqueued.with("AccountMailer", "notify_of_new_messages", "deliver_now", {args: [jim.account, [message1.id, message2.id, message3.id]]})
      expect(ActionMailer::MailDeliveryJob).not_to have_been_enqueued.with("AccountMailer", "notify_of_new_messages", "deliver_now", {args: [michael.account, any_args]})
    end
  end
end
