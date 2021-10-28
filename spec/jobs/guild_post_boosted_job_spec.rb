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
      expect do
        enqueued_job
      end.to have_enqueued_mail(Guild::PostBoostMailer, :new_post).once
    end

    it "enqueues multiple mails for separate specialists" do
      another_specialist.subscribe_to!(labels.first)

      expect do
        enqueued_job
      end.to have_enqueued_mail(Guild::PostBoostMailer, :new_post).twice
    end

    it "does not enqueue a mail for the author of the post" do
      labels.each { |gt| guild_post.specialist.subscribe_to!(gt) }
      expect(guild_post.specialist.subscriptions.count).to eq(labels.size)

      expect do
        enqueued_job
      end.not_to have_enqueued_mail(Guild::PostBoostMailer, :new_post).with({post: guild_post, subscriber_id: guild_post.specialist.id})
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
        actor: nil,
        action: "suggested_post",
        notifiable_type: "Guild::Post",
        notifiable_id: guild_post.id
      })
    end
  end
end
