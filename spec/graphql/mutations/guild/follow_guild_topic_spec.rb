# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::Guild::FollowGuildTopic do
  subject(:follow_guild_topic) do
    resp = AdvisableSchema.execute(query, context: {current_user: specialist})
    resp.dig("data", "followGuildTopic", "guildTopic")
  end

  let!(:guild_topic) { create(:guild_topic) }
  let(:specialist) { create(:specialist, :guild) }

  let(:query) do
    <<-GRAPHQL
    mutation {
      followGuildTopic(input: {
        guildTopicId: "#{guild_topic.id}"
      }) {
        guildTopic {
          id
          name
        }
      }
    }
    GRAPHQL
  end

  it "adds a guild_topic to the specialist's subscriptions" do
    expect do
      follow_guild_topic
      specialist.reload
    end.to change(Subscription, :count).from(0).to(1).
      and change(specialist.subscriptions, :count).from(0).to(1)
    expect(specialist.guild_subscribed_topics.first).to eq(guild_topic)
  end

  it "does not follow a topic thats already followed" do
    specialist.subscribe_to!(guild_topic)

    expect do
      follow_guild_topic
      specialist.reload
    end.not_to change(specialist.subscriptions, :count)
  end
end
