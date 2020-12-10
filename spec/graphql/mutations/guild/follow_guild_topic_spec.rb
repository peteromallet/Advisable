require 'rails_helper'

RSpec.describe Mutations::Guild::FollowGuildTopic do
  subject(:follow_guild_topic) {
    resp = AdvisableSchema.execute(query, context: {current_user: specialist})
    resp.dig("data", "followGuildTopic", "guildTopic")
  }

  let!(:guild_topic) { create(:guild_topic) }
  let(:specialist) { create(:specialist, :guild) }

  let(:query) {
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
  }

  it "adds a guild_topic to the specialist's follows" do
    expect {
      follow_guild_topic
      specialist.reload
    }.to change(Follow, :count).from(0).to(1).
      and change(specialist.follows, :count).from(0).to(1)
    expect(specialist.guild_topics_follows.first).to eq(guild_topic)
  end

  it "does not follow a topic thats already followed" do
    specialist.follow(guild_topic)

    expect {
      follow_guild_topic
      specialist.reload
    }.not_to change(specialist.follows, :count)
  end
end
