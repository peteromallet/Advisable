require 'rails_helper'

RSpec.describe Types::Guild::TopicType do
  let(:specialist) { create(:specialist, :guild) }
  let(:context) {
    {
      current_user: specialist
    }
  }

  let(:query) do
    <<-GRAPHQL
      {
        guildTopTopics(first: 20) {
          nodes {
            id
            name
          }
        }
      }   
    GRAPHQL
  end

  before do
    create_list(:guild_topic, 5)
  end

  describe "with a non guild specialist" do
    let(:non_guild_specialist) { build(:specialist) }

    it "returns null top topics" do
      resp = AdvisableSchema.execute(
        query,
        context: {
          current_user: non_guild_specialist
        }
      )
      expect(resp.dig('data', 'guildTopTopics', 'nodes')).to be_nil
    end
  end

  describe "with a guild specialist" do
    subject(:guild_top_topics) {
      response = AdvisableSchema.execute(query, context: context)
      response.dig('data', 'guildTopTopics', 'nodes')
    }

    it "includes the top guild topic tags" do
      top_topics = Guild::Topic.most_used(5).map { |gt| gt.slice(:id, :name) }
      expect(subject).to match(top_topics)
    end
  end
end
