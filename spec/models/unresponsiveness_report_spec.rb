# frozen_string_literal: true

require 'rails_helper'

RSpec.describe UnresponsivenessReport do
  let(:report) { create(:unresponsiveness_report) }
  let(:specialist) { report.application.specialist.account }
  let(:user) { report.application.project.user.account }
  let(:conversation) { Conversation.by_accounts([specialist, user]) }

  it "has a valid factory" do
    expect(report).to be_valid
  end

  describe "#last_message_by_specialist_at" do
    it "returns the last created_at by specialist" do
      one_hour = 1.hour.ago
      create(:message, conversation: conversation, created_at: one_hour, author: specialist)
      create(:message, conversation: conversation, created_at: 1.day.ago, author: specialist)
      create(:message, conversation: conversation, created_at: 2.days.ago, author: user)

      expect(report.last_message_by_specialist_at).to be_within(1.second).of(one_hour)
    end

    it "returns nil when no messages by specialist" do
      create(:message, conversation: conversation, created_at: 2.days.ago, author: user)

      expect(report.last_message_by_specialist_at).to be_nil
    end

    it "returns nil when no messages" do
      expect(report.last_message_by_specialist_at).to be_nil
    end
  end

  describe "last_message_by_client_at" do
    it "returns the last created_at by user" do
      one_hour = 1.hour.ago
      create(:message, conversation: conversation, created_at: one_hour, author: user)
      create(:message, conversation: conversation, created_at: 1.day.ago, author: user)
      create(:message, conversation: conversation, created_at: 2.days.ago, author: specialist)

      expect(report.last_message_by_client_at).to be_within(1.second).of(one_hour)
    end

    it "returns nil when no messages by user" do
      create(:message, conversation: conversation, created_at: 2.days.ago, author: specialist)

      expect(report.last_message_by_client_at).to be_nil
    end

    it "returns nil when no messages" do
      expect(report.last_message_by_client_at).to be_nil
    end
  end
end
