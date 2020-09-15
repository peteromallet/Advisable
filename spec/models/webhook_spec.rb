require 'rails_helper'

RSpec.describe Webhook do
  it "has a valid factory" do
    webhook = build(:webhook)
    expect(webhook).to be_valid
  end

  describe "#perform" do
    it "is called after the record is created" do
      webhook = build(:webhook)
      expect(webhook).to receive(:perform)
      webhook.save
    end

    it "schedules a sidekiq job for the webhook" do
      webhook = create(:webhook)
      expect(WebhookJob).to receive(:perform_later).with(webhook.id)
      webhook.perform
    end
  end
end
