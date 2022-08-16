# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::Guild::DeleteGuildPost do
  let(:specialist) { create(:specialist) }
  let!(:guild_post) { create(:guild_post, specialist:) }

  let(:query) do
    <<-GRAPHQL
    mutation {
      deleteGuildPost(input: {
        guildPostId: "#{guild_post.id}"
      }) {
        guildPost {
          id
        }
      }
    }
    GRAPHQL
  end

  it "deletes a guild post" do
    expect do
      AdvisableSchema.execute(query, context: {current_user: specialist})
    end.to change(Guild::Post, :count).from(1).to(0)
  end

  it "does not delete a post that doesn't belong to current_user" do
    expect do
      AdvisableSchema.execute(query, context: {current_user: create(:specialist)})
    end.not_to change(Guild::Post, :count)
  end
end
