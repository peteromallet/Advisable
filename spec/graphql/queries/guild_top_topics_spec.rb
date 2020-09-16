require 'rails_helper'

RSpec.describe Types::Guild::TopicType do
  let(:specialist) { create(:specialist, :guild) }
  let(:response_keys) { %w[guildTopTopics nodes] }
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

  it_behaves_like "guild specialist"

  describe "guild top topics response" do
    subject(:guild_top_topics) {
      response = AdvisableSchema.execute(query, context: context)
      response.dig('data', *response_keys)
    }

    it "includes the top guild topic tags" do
      top_topics = Guild::Topic.most_used(5).map { |gt| gt.slice(:id, :name) }
      expect(subject).to match(top_topics)
    end
  end
end
