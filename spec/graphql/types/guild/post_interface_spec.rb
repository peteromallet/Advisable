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

  let(:opportunity_query) do
    <<-GRAPHQL
      #{guild_post_fields_fragment}
      {
        guildPosts(first: 10, type: "Opportunity") {
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
        labels {
          slug
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

    describe "when filtered by a label" do
      subject(:filtered_by_label) do
        resp = AdvisableSchema.execute(query, context: {current_user: guild_specialist})
        resp.dig("data", "labelPosts", "nodes")
      end

      let(:labels) { create_list(:label, 2) }

      let(:query) do
        <<-GRAPHQL
        {
          labelPosts(first: 5, labelSlug: "#{labels.first.slug}") {
            nodes {
              labels {
                slug
              }
            }
          }
        }
        GRAPHQL
      end

      let(:not_found_query) do
        <<-GRAPHQL
        {
          labelPosts(first: 5, labelSlug: "nothing-here") {
            nodes {
              labels {
                slug
              }
            }
          }
        }
        GRAPHQL
      end

      it "returns posts that have the label" do
        opportunity.labels << labels.first
        opportunity.save!

        label_results = filtered_by_label[0]["labels"]
        expect(label_results.size).to eq(1)
        expect(label_results.size).not_to eq(Label.count)
        expect(label_results[0]).to include({"slug" => labels.first.slug})
      end

      it "returns a not found error" do
        resp = AdvisableSchema.execute(not_found_query, context: {current_user: guild_specialist})
        expect(resp["errors"][0]["extensions"]).to eq({"type" => "INVALID_REQUEST", "code" => "NOT_FOUND"})
      end
    end
  end

  context "with removed posts" do
    let(:shadow_ban_specialist) { create(:specialist, :guild) }
    let!(:removed_post) { create(:guild_post, status: "removed", specialist: shadow_ban_specialist) }

    let(:query) do
      <<-GRAPHQL
        {
          guildPosts(first: 5) {
            nodes {
              ... on PostInterface {
                id
              }
            }
          }
        }
      GRAPHQL
    end

    it "does not include removed posts" do
      response = AdvisableSchema.execute(query, context: {current_user: guild_specialist})
      feed_results = response.dig("data", *response_keys)

      expect(feed_results).not_to include(removed_post.slice("id"))
    end

    it "includes removed posts if the viewer is the author" do
      response = AdvisableSchema.execute(query, context: {current_user: shadow_ban_specialist})
      feed_results = response.dig("data", *response_keys)

      expect(feed_results).to include(removed_post.slice("id"))
    end
  end

  context "with popular post results" do
    let!(:popular_post) { create(:opportunity_guild_post, reactionable_count: 500) }

    it "includes popular posts when filtered by other types" do
      resp = AdvisableSchema.execute(opportunity_query, context: {current_user: guild_specialist})
      results = resp.dig("data", *response_keys)

      expect(results.first["id"]).to eq(popular_post.id)
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
            isPopular
            labels {
              slug
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
      let(:response) { AdvisableSchema.execute(query[guild_post.id], context: context) }
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

      it "includes the label" do
        label = create(:label)
        guild_post.labels << label
        guild_post.save

        expect(node['labels'][0]['name']).to eq(label.name)
      end

      it "is popular" do
        guild_post.update! reactionable_count: Guild::Post::POPULAR_THRESHOLD
        expect(node['isPopular']).to eq(true)
      end

      it "is not popular" do
        guild_post.update! reactionable_count: Guild::Post::POPULAR_THRESHOLD - 1
        expect(node['isPopular']).to eq(false)
      end
    end
  end

  context "with unpublished labels" do
    subject(:guild_post_query) do
      resp = AdvisableSchema.execute(opportunity_query, context: {current_user: guild_specialist})
      resp["data"]["guildPosts"]["nodes"][0]
    end

    let(:unpublished_label) { create(:label, name: "Nothing here to see", published_at: nil) }
    let!(:guild_post) { create(:opportunity_guild_post) }

    before do
      guild_post.labels << unpublished_label
      guild_post.save!
    end

    it "does not include unpublished labels" do
      expect(guild_post.labels.count).to eq(1)
      expect(guild_post_query["labels"].size).to eq(0)
    end

    it "includes unpublished labels if the author is current_user" do
      guild_post.update!(specialist: guild_specialist)
      expect(guild_post.labels.count).to eq(1)
      expect(guild_post_query["labels"].size).to eq(1)
    end
  end
end
