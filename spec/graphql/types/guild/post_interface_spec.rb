# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Types::Guild::PostInterface do
  include ActionView::Helpers::DateHelper

  let(:guild_specialist) { build(:specialist, :guild) }
  let(:response_keys) { %w[guildPosts nodes] }
  let(:query) do
    <<-GRAPHQL
      #{guild_post_fields_fragment}
      {
        guildPosts(first: 10) {
          nodes {
            ...GuildPostFields
          }
        }
      }
    GRAPHQL
  end

  let(:guild_post_fields_fragment) do
    <<-GRAPHQL
      fragment GuildPostFields on PostInterface {
        id
        type
        title
        body
        reacted
        reactionsCount
        commented
        commentsCount
        authored
        createdAtTimeAgo
        author {
          id
          name
          avatar
        }
        guildTopics {
          id
          name
        }
      }
    GRAPHQL
  end

  it_behaves_like "guild specialist"

  context "with filters" do
    let!(:opportunity) { create(:opportunity_guild_post) }

    before do
      create_list(:guild_post, 5)
    end

    describe "when filtered by type" do
      subject(:filtered_by_type) do
        resp = AdvisableSchema.execute(
          query,
          context: {current_user: guild_specialist}
        )
        resp.dig("data", *response_keys)
      end

      let(:query) do
        <<-GRAPHQL
          #{guild_post_fields_fragment}
          {
            guildPosts(first: 5, type: "Opportunity") {
              nodes {
                ...GuildPostFields
              }
            }
          }
        GRAPHQL
      end

      it "filters by the type of post" do
        expect(filtered_by_type.size).to eq(1)
        expect(filtered_by_type.size).not_to eq(Guild::Post.count)
        expect(filtered_by_type.first).to include({
                                                    "type" => "Opportunity",
                                                    "id" => opportunity.id
                                                  })
      end
    end

    describe "when filtered by a guild topic" do
      subject(:filtered_by_topic) do
        resp = AdvisableSchema.execute(query, context: {current_user: guild_specialist})
        resp.dig("data", *response_keys)
      end

      let(:guild_topics) { create_list(:guild_topic, 2) }

      let(:query) do
        <<-GRAPHQL
          {
            guildPosts(first: 5, topicId: "#{guild_topics.first.slug}") {
              nodes {
                guildTopics {
                  slug
                }
              }
            }
          }
        GRAPHQL
      end

      before do
        opportunity.guild_topic_list.add(guild_topics.first)
        opportunity.save!
      end

      it "returns posts that are tagged with the topic" do
        topic_results = filtered_by_topic[0]["guildTopics"]
        expect(topic_results.size).to eq(1)
        expect(topic_results.size).not_to eq(Guild::Topic.count)
        expect(topic_results[0]).to include({
                                              "slug" => guild_topics.first.slug
                                            })
      end

      it "can filter by the guild topic id" do
        query = <<-GRAPHQL
          {
            guildPosts(first: 5, topicId: "#{guild_topics.first.id}") {
              nodes {
                guildTopics {
                  id
                }
              }
            }
          }
        GRAPHQL
        resp = AdvisableSchema.execute(query, context: {current_user: guild_specialist})
        topic_results = resp.dig("data", *response_keys)[0]["guildTopics"]
        expect(topic_results[0]).to include({"id" => guild_topics.first.id})
      end
    end
  end

  context "with removed posts" do
    let(:shadow_ban_specialist) { create(:specialist, :guild) }
    let!(:removed_post) { create(:guild_post, status: "removed", specialist: shadow_ban_specialist) }
    let!(:published_post) { create(:guild_post, status: "published") }

    let(:query) do
      <<-GRAPHQL
        {
          guildPosts(first: 5) {
            nodes {
              ... on PostInterface {
                id
                status
              }
            }
          }
        }
      GRAPHQL
    end

    it "does not include removed posts" do
      feed_response = AdvisableSchema.execute(query, context: {current_user: guild_specialist})
      posts = feed_response.dig("data", *response_keys)

      expect(posts.count).to eq(1)
      expect(posts).to eq([published_post.slice("id", "status")])
    end

    it "includes removed posts if the viewer is the author" do
      feed_response = AdvisableSchema.execute(query, context: {current_user: shadow_ban_specialist})
      posts = feed_response.dig("data", *response_keys)

      expect(posts.count).to eq(2)
      expect(posts).to include(
        {
          "id" => removed_post.id,
          "status" => "removed"
        }
      )
    end
  end

  context 'when a post is pinned' do
    let!(:pinned) { create(:guild_post, created_at: 10.days.ago, pinned: true) }

    before do
      create_list(:guild_post, 5)
    end

    it 'is always first in the result' do
      response = AdvisableSchema.execute(query, context: {current_user: guild_specialist})
      posts = response["data"]["guildPosts"]["nodes"]
      expect(posts.first["id"]).to eq(pinned.id)
    end
  end

  context "when querying a single guild post" do
    let(:specialist) { build(:specialist, :guild) }
    let(:non_guild_specialist) { build(:specialist) }
    let(:context) do
      {
        current_user: specialist
      }
    end
    let(:guild_post) { create(:guild_post) }
    let(:advice_required) { create(:advice_required_guild_post) }

    let(:query) do
      lambda { |id|
        <<-GRAPHQL
        {
          guildPost(id: "#{id}") {
            id
            type
            commented
            createdAtTimeAgo
            guildTopics {
              id
              name
            }
          }
        }
        GRAPHQL
      }
    end

    context "with a non guild specialist" do
      let(:non_guild_specialist) { build(:specialist) }

      it "returns a null guildPost" do
        resp = AdvisableSchema.execute(
          query[guild_post.id],
          context: {
            current_user: non_guild_specialist
          }
        )
        expect(resp.dig('data', 'guildPost')).to be_nil
      end
    end

    context "with no current_user" do
      it "returns a guild post if its shareable" do
        guild_post.update!(shareable: true)

        resp = AdvisableSchema.execute(
          query[guild_post.id],
          context: {
            current_user: nil
          }
        )
        expect(resp.dig('data', 'guildPost')).not_to be_nil
      end

      it "does not return a guild post if its not shareable" do
        guild_post.update!(shareable: false)

        resp = AdvisableSchema.execute(
          query[guild_post.id],
          context: {
            current_user: nil
          }
        )
        expect(resp.dig('data', 'guildPost')).to be_nil
      end
    end

    it 'includes additional fields for other guild_post types' do
      resp = AdvisableSchema.execute(
        query[advice_required.id],
        context: context
      )
      node = resp.dig('data', 'guildPost')
      expect(node).to include(
        {
          "id" => advice_required.id,
          "type" => "Advice Required"
        }
      )
    end

    context "with a guild_post query" do
      let(:response) do
        AdvisableSchema.execute(
          query[guild_post.id],
          context: context
        )
      end
      let(:node) { response.dig('data', 'guildPost') }

      it 'includes interface fields for a Guild::Post' do
        expect(node).to include({"id" => guild_post.id})
      end

      it "includes the normalized type instead of type" do
        expect(node["type"]).to eq(guild_post.normalized_type)
      end

      it "includes the created_at date in words" do
        expect(node["createdAtTimeAgo"]).to eq(
          time_ago_in_words(guild_post.created_at)
        )
      end

      it "includes the tagged guild topics" do
        topic = create(:guild_topic)
        guild_post.guild_topic_list << topic.name
        guild_post.save

        expect(node['guildTopics'][0]['name']).to eq(topic.name)
      end
    end
  end
end
