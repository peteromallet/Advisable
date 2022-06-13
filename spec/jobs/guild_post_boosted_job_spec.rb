# frozen_string_literal: true

require "rails_helper"

RSpec.describe GuildPostBoostedJob do
  subject(:enqueued_job) do
    described_class.perform_now(guild_post.id)
  end

  let(:guild_post) { create(:guild_post, :published) }
  let(:labels) { create_list(:label, 5) }
  let(:specialist) { create(:specialist) }
  let(:another_specialist) { create(:specialist) }

  before do
    labels.each { |g| specialist.subscribe_to!(g) }
    guild_post.labels = labels
  end

  context "with boosted mailer" do
    it "only enqueues one mail if there are multiple subscriptions from the same specialist" do
      enqueued_job
      expect(ActionMailer::MailDeliveryJob).to have_been_enqueued.with("Guild::PostBoostMailer", "new_post", "deliver_now", any_args).once
    end

    it "enqueues multiple mails for separate specialists" do
      another_specialist.subscribe_to!(labels.first)

      enqueued_job
      expect(ActionMailer::MailDeliveryJob).to have_been_enqueued.with("Guild::PostBoostMailer", "new_post", "deliver_now", any_args).twice
    end

    it "does not enqueue a mail for the author of the post" do
      labels.each { |gt| guild_post.specialist.subscribe_to!(gt) }
      expect(guild_post.specialist.subscriptions.count).to eq(labels.size)

      enqueued_job
      expect(ActionMailer::MailDeliveryJob).not_to have_been_enqueued.with("Guild::PostBoostMailer", "new_post", "deliver_now", args: [{post: guild_post, subscriber_id: guild_post.specialist.id}])
    end
  end

  context "with suggested_post notifications" do
    it "creates a notification for the subscribers account" do
      expect do
        enqueued_job
      end.to change(Notification, :count).from(0).to(1)

      notification = specialist.account.notifications.first
      expect(notification).to have_attributes({
        account: specialist.account,
        action: "suggested_post",
        guild_post_id: guild_post.id
      })
    end
  end
end
