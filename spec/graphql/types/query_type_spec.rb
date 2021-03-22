# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Types::QueryType do
  let(:specialist) { create(:specialist, :guild) }
  let(:context) { {current_user: specialist} }
  let(:response)  { AdvisableSchema.execute(query, context: context) }

  describe "guild followed topics" do
    subject(:guild_followed_topics) { response.dig("data", "guildFollowedTopics") }

    let(:guild_topics) { create_list(:guild_topic, 3) }
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

    before { guild_topics.each { |topic| specialist.subscribe_to!(topic) } }

    it "returns the guild topics that the specialist follows" do
      expect(guild_followed_topics).to eq(guild_topics.reverse.as_json(only: %i[id name]))
    end
  end

  describe "followed labels" do
    subject(:followed_labels) { response.dig("data", "followedLabels") }

    let(:labels) { create_list(:label, 3) }
    let(:query) do
      <<-GRAPHQL
      {
        followedLabels {
          id
          name
        }
      }
      GRAPHQL
    end

    before { labels.each { |label| specialist.subscribe_to!(label) } }

    it "returns the labels that the specialist follows" do
      expect(followed_labels).to eq(labels.reverse.as_json(only: %i[id name]))
    end
  end
end
