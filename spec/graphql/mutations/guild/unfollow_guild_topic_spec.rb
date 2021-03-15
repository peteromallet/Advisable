# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::Guild::UnfollowGuildTopic do
  subject(:unfollow_guild_topic) do
    resp = AdvisableSchema.execute(query, context: {current_user: specialist})
    resp.dig("data", "followGuildTopic", "guildTopic")
  end

  let!(:guild_topic) { create(:guild_topic) }
  let(:specialist) { create(:specialist, :guild) }

  let(:query) do
    <<-GRAPHQL
    mutation {
      unfollowGuildTopic(input: {
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

  it "unsubscribes from a guild_topic" do
    specialist.subscribe_to!(guild_topic)

    expect do
      unfollow_guild_topic
      specialist.reload
    end.to change(Subscription, :count).from(1).to(0).
      and change(specialist.subscriptions, :count).from(1).to(0)
    expect(specialist.subscriptions).to be_empty
  end

  it "does not unfollow a guild_topic that is not followed" do
    new_topic = create(:guild_topic, name: "new-topic")
    specialist.subscribe_to!(new_topic)
    expect(specialist.subscriptions.count).to eq(1)

    expect do
      unfollow_guild_topic
      specialist.reload
    end.not_to change(specialist.subscriptions, :count)
  end
end
