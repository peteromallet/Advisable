# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Guild::PostBoostMailer do
  describe '#new_post' do
    subject(:mail) {
      described_class.new_post(post: guild_post, follower_id: specialist.id)
    }

    let(:account)    { create(:account) }
    let(:specialist) { create(:specialist, account: account) }
    let(:guild_post) { create(:guild_post) }

    it "sends an email with a truncated title" do
      expect(mail.subject).to eq("New Post - #{guild_post.title.truncate(80)}")
    end

    it "does not send the email when unsubscribed" do
      account = create(:account, unsubscribed_from: ["Advisable Guild"])
      specialist.update! account: account
      expect(mail.to).to eq(nil)
    end
  end
end
