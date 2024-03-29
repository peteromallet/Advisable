# frozen_string_literal: true

require "rails_helper"

RSpec.describe Types::Guild::Post do
  include ActionView::Helpers::DateHelper

  context "when querying a single guild post" do
    let(:specialist) { build(:specialist) }
    let(:non_guild_specialist) { build(:specialist) }
    let(:guild_post) { create(:guild_post) }

    let(:query) do
      lambda { |id|
        <<-GRAPHQL
        {
          guildPost(id: "#{id}") {
            id
            createdAtTimeAgo
            labels {
              slug
              name
            }
          }
        }
        GRAPHQL
      }
    end

    context "with a rejected specialist" do
      let(:rejected_specialist) { build(:specialist, :rejected) }

      it "returns a null guildPost" do
        resp = AdvisableSchema.execute(
          query[guild_post.id],
          context: {
            current_user: rejected_specialist
          }
        )
        expect(resp.dig("data", "guildPost")).to be_nil
      end
    end

    context "with no current_user" do
      it "returns a guild post if its shareable" do
        guild_post.update!(shareable: true)

        resp = AdvisableSchema.execute(
          query[guild_post.id],
          context: {current_user: nil}
        )
        expect(resp.dig("data", "guildPost")).not_to be_nil
      end

      it "does not return a guild post if its not shareable" do
        guild_post.update!(shareable: false)

        resp = AdvisableSchema.execute(
          query[guild_post.id],
          context: {current_user: nil}
        )
        expect(resp.dig("data", "guildPost")).to be_nil
      end
    end

    context "with a guild_post query" do
      let(:response) { AdvisableSchema.execute(query[guild_post.id], context: {current_user: specialist}) }
      let(:node) { response.dig("data", "guildPost") }

      it "includes interface fields for a Guild::Post" do
        expect(node).to include({"id" => guild_post.id})
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

        expect(node["labels"][0]["name"]).to eq(label.name)
      end
    end
  end
end
