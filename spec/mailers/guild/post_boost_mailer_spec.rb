# frozen_string_literal: true

require "rails_helper"

RSpec.describe Guild::PostBoostMailer do
  describe "#new_post" do
    subject(:mail) do
      described_class.new_post(post: guild_post, subscriber_id: specialist.id)
    end

    let(:account)    { create(:account) }
    let(:specialist) { create(:specialist, account: account) }
    let(:guild_post) { create(:guild_post, title: "This is a long title that should be truncated when sent as a subject line") }

    it "sends an email with a truncated title" do
      expect(mail.subject).to eq("New Post - This is a long title that should be truncated when sent as a subje...")
    end

    it "does not send the email when unsubscribed" do
      account = create(:account, unsubscribed_from: ["Advisable Guild"])
      specialist.update! account: account
      expect(mail.to).to eq(nil)
    end
  end
end
