# frozen_string_literal: true

require "rails_helper"

RSpec.describe Conversation, type: :model do
  let(:conversation) { create(:conversation) }
  let(:user) { create(:user) }
  let(:consultation) { create(:consultation) }
  let(:pdf) { ActiveStorage::Blob.create_and_upload!(io: File.open(Rails.root.join("spec/support/test.pdf")), filename: "test.pdf").signed_id }
  let(:image) { ActiveStorage::Blob.create_and_upload!(io: File.open(Rails.root.join("spec/support/01.jpg")), filename: "01.jpg").signed_id }

  it "has a valid factory" do
    expect(build(:conversation)).to be_valid
  end

  describe "#new_message!" do
    it "creates a message in a conversation and calls after create actions" do
      expect_any_instance_of(Message).to receive(:schedule_email_notifications)
      expect_any_instance_of(Message).to receive(:update_participants)
      new_message = conversation.new_message!(user.account, "Test")
      message = conversation.messages.last
      expect(new_message).to eq(message)
    end

    it "can take extra attributes" do
      message = conversation.new_message!(user.account, "Test", uid: "msg_123456789012345", metadata: {foo: :bar}, consultation:)
      expect(message.uid).to eq("msg_123456789012345")
      expect(message.metadata).to eq({"foo" => "bar"})
      expect(message.consultation).to eq(consultation)
    end

    it "can create a message without scheduling email notifications" do
      expect_any_instance_of(Message).not_to receive(:schedule_email_notifications)
      expect_any_instance_of(Message).to receive(:update_participants)
      message = conversation.new_message!(user.account, "Test", metadata: {foo: :bar}, consultation:, send_emails: false)
      expect(message.metadata).to eq({"foo" => "bar"})
      expect(message.consultation).to eq(consultation)
    end

    it "can attach attachments" do
      new_message = conversation.new_message!(user.account, "Test", attachments: [pdf, image])
      expect(new_message.attachments.count).to eq(2)
      expect(new_message.attachments.map { |a| a.blob.filename.to_s }).to match_array(["test.pdf", "01.jpg"])
    end

    context "when author is nil" do
      it "marks it as system message" do
        message = conversation.new_message!(nil, "Test")
        expect(message).to be_system_message
      end
    end
  end
end
