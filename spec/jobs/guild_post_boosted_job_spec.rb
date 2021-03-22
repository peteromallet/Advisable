# frozen_string_literal: true

require "rails_helper"

RSpec.describe GuildPostBoostedJob do
  subject(:enqueued_job) do
    described_class.perform_now(guild_post.id)
  end

  let(:guild_post) { create(:guild_post, :published) }
  let(:guild_topics) { create_list(:guild_topic, 5) }
  let(:specialist) { create(:specialist, :guild) }
  let(:another_specialist) { create(:specialist, :guild) }

  before do
    guild_topics.each { |g| specialist.subscribe_to!(g) }
    guild_post.guild_topics = guild_topics
  end

  context "with boosted mailer" do
    it "only enqueues one mail if there are multiple subscriptions from the same specialist" do
      expect do
        enqueued_job
      end.to have_enqueued_mail(Guild::PostBoostMailer, :new_post).once
    end

    it "enqueues multiple mails for separate specialists" do
      another_specialist.subscribe_to!(guild_topics.first)

      expect do
        enqueued_job
      end.to have_enqueued_mail(Guild::PostBoostMailer, :new_post).twice
    end

    it "does not enqueue a mail for the author of the post" do
      guild_topics.each { |gt| guild_post.specialist.subscribe_to!(gt) }
      expect(guild_post.specialist.subscriptions.on_tag.count).to eq(guild_topics.size)
      expect(guild_post.specialist.subscriptions.on_label.count).to eq(guild_topics.size)

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
