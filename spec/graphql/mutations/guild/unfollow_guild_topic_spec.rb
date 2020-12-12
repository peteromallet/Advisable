require 'rails_helper'

RSpec.describe Mutations::Guild::UnfollowGuildTopic do
  subject(:unfollow_guild_topic) {
    resp = AdvisableSchema.execute(query, context: {current_user: specialist})
    resp.dig("data", "followGuildTopic", "guildTopic")
  }

  let!(:guild_topic) { create(:guild_topic) }
  let(:specialist) { create(:specialist, :guild) }

  let(:query) {
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
  }

  it "unfollows a guild_topic" do
    specialist.follow(guild_topic)

    expect {
      unfollow_guild_topic
      specialist.reload
    }.to change(Follow, :count).from(1).to(0).
      and change(specialist.follows, :count).from(1).to(0)
    expect(specialist.guild_followed_topics).to be_empty
  end

  it "does not unfollow a guild_topic that is not followed" do
    new_topic = create(:guild_topic, name: "new-topic")
    specialist.follow(new_topic)
    expect(specialist.follows.count).to eq(1)

    expect {
      unfollow_guild_topic
      specialist.reload
    }.not_to change(specialist.follows, :count)
  end
end
