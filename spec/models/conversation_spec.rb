# frozen_string_literal: true

require "rails_helper"

RSpec.describe Conversation, type: :model do
  let(:conversation) { create(:conversation) }
  let(:user) { create(:user) }
  let(:consultation) { create(:consultation) }

  it "has a valid factory" do
    expect(build(:conversation)).to be_valid
  end

  describe "#new_message!" do
    it "creates a message in a conversation and calls after create actions" do
      expect_any_instance_of(Message).to receive(:after_create_actions)
      new_message = conversation.new_message!(user.account, "Test")
      message = conversation.messages.last
      expect(new_message).to eq(message)
    end

    it "can take extra attributes" do
      message = conversation.new_message!(user.account, "Test", uid: "msg_123456789012345", metadata: {foo: :bar}, consultation: consultation)
      expect(message.uid).to eq("msg_123456789012345")
      expect(message.metadata).to eq({"foo" => "bar"})
      expect(message.consultation).to eq(consultation)
    end

    context "when author is nil" do
      it "marks it as system message" do
        message = conversation.new_message!(nil, "Test")
        expect(message).to be_system_message
      end
    end
  end
end
