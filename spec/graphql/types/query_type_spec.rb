require 'rails_helper'

RSpec.describe Types::QueryType do
  describe "guild followed topics" do
    let(:specialist) { create(:specialist, :guild) }
    let(:query) do
      <<-GRAPHQL
      {
        guildFollowedTopics {
          id
          name
        }
      }
      GRAPHQL
    end

    describe "guild topics follows" do
      subject(:guild_followed_topics) {
        context = {
          current_user: specialist
        }
        resp = AdvisableSchema.execute(query, context: context)
        resp.dig("data", "guildFollowedTopics")
      }

      let(:guild_topics) { create_list(:guild_topic, 3) }

      before do
        guild_topics.each { |topic| specialist.follow(topic) }
      end

      it "returns the guild topics that the specialist follows" do
        expect(guild_followed_topics).to eq(guild_topics.reverse.as_json(only: [:id, :name]))
      end
    end
  end
end
