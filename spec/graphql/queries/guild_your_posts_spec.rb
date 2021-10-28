# frozen_string_literal: true

require "rails_helper"

RSpec.describe "guild your posts query", type: :system do
  subject(:guild_your_posts) do
    context = {
      current_user: current_user
    }
    resp = AdvisableSchema.execute(query, context: context)
    resp.dig("data", *response_keys)
  end

  let(:specialists) { create_list(:specialist, 2) }
  let(:current_user) { specialists.first }
  let(:response_keys) { %w[guildYourPosts nodes] }
  let(:query) do
    <<-GRAPHQL
    {
      guildYourPosts(first: 10) {
        nodes {
          status
          author {
            id
          }
        }
      }
    }
    GRAPHQL
  end

  before do
    create_list(:guild_post, 2, status: "published", specialist: current_user)
    create_list(:guild_post, 2, specialist: specialists.last)
  end

  it_behaves_like "accepted specialist"

  it "returns posts belonging to the current_user" do
    expect(Guild::Post.count).to eq(4)
    expect(guild_your_posts.size).to eq(2)
    expect(
      guild_your_posts.detect { |el| el["author"]["id"] != current_user.uid }
    ).to be_nil
  end

  it "does not include removed posts" do
    create(:guild_post, status: "removed", specialist: current_user)
    expect(guild_your_posts).not_to(eq(current_user.guild_posts.count))
  end
end
