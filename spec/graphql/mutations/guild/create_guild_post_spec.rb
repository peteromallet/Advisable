# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::Guild::CreateGuildPost do
  let(:specialist) { create(:specialist, :guild) }
  let(:response_keys) { %w[createGuildPost guildPost] }
  let(:title) { Faker::Lorem.sentence }
  let(:body) { Faker::Lorem.paragraph }

  let(:query) do
    <<-GRAPHQL
    mutation {
      createGuildPost(input: {
        title: "#{title}",
        body: "#{body}",
        type: "CaseStudy"
      }) {
        guildPost {
          id
          title
          body
          type
          status
          denormalizedType
          audienceType
          coverImage {
            id
          }
          images {
            id
          }
          author {
            id
          }
        }
      }
    }
    GRAPHQL
  end

  it_behaves_like "guild specialist"

  context "with a guild specialist" do
    subject(:create_guild_post) do
      resp = AdvisableSchema.execute(query, context: {current_user: specialist})
      resp.dig("data", *response_keys)
    end

    it "creates a new guild post" do
      expect { create_guild_post }.to change {
        Guild::Post.count
      }.by(1)

      expect(create_guild_post).to include({
        "audienceType" => nil,
        "images" => [],
        "status" => "draft",
        "body" => body,
        "title" => title,
        "denormalizedType" => "CaseStudy",
        "type" => "Case Study",
        "author" => {"id" => specialist.uid}
      })
    end
  end
end
