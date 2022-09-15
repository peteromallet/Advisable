# frozen_string_literal: true

require "rails_helper"

RSpec.describe Types::SpecialistType do
  let(:specialist) { create(:specialist) }
  let(:context) { {current_user: specialist} }
  let(:response) { AdvisableSchema.execute(query, context:) }

  describe "email field" do
    let(:query) do
      <<-GRAPHQL
      {
        specialist(id: "#{specialist.uid}") {
          email
        }
      }
      GRAPHQL
    end

    context "when logged in as another specialist" do
      let(:context) { {current_user: create(:specialist)} }

      it "prevents access" do
        error = response["errors"][0]["extensions"]["code"]
        expect(response["data"]["specialist"]["email"]).to be_nil
        expect(error).to eq("INVALID_PERMISSIONS_FOR_FIELD")
      end
    end

    context "when logged in as a user" do
      let(:context) { {current_user: create(:user)} }

      it "prevents access" do
        error = response["errors"][0]["extensions"]["code"]
        expect(response["data"]["specialist"]["applications"]).to be_nil
        expect(error).to eq("INVALID_PERMISSIONS_FOR_FIELD")
      end
    end

    context "when logged in as an admin" do
      let(:context) { {current_user: create(:user, account: create(:account, permissions: %w[admin]))} }

      it "allows access" do
        email = response["data"]["specialist"]["email"]
        expect(email).not_to be_nil
      end
    end
  end

  context "with an accepted specialist" do
    let!(:specialist) { create(:specialist) }
    let(:query) do
      <<-GRAPHQL
      {
        specialist(id: "#{specialist.uid}") {
          id
          guildPosts(first: 10) {
            pageInfo {
              endCursor
              hasNextPage
            }
            nodes {
              status
              id
            }
          }
        }
      }
      GRAPHQL
    end

    context "with a freelancer profile" do
      let(:shadow_ban_specialist) { create(:specialist) }
      let!(:published_post) { create(:guild_post, specialist:, status: "published") }
      let!(:removed_post) { create(:guild_post, specialist:, status: "removed") }

      it "only includes published posts" do
        viewer = create(:specialist)
        create(:guild_post, specialist:, status: "draft")
        response = AdvisableSchema.execute(query, context: {current_user: viewer})
        specialist_posts = response.dig("data", "specialist", "guildPosts", "nodes")

        expect(specialist.guild_posts.count).to eq(3)
        expect(specialist_posts.size).to eq(1)
        expect(specialist_posts).to eq([{"status" => "published", "id" => published_post.id}])
      end

      it "includes removed posts if the viewer is the author" do
        response = AdvisableSchema.execute(query, context: {current_user: specialist})
        specialist_posts = response.dig("data", "specialist", "guildPosts", "nodes")
        expect(specialist_posts.size).to eq(2)
        expect(specialist_posts).to eq([
          {"status" => "removed", "id" => removed_post.id},
          {"status" => "published", "id" => published_post.id}
        ])
      end
    end
  end
end
