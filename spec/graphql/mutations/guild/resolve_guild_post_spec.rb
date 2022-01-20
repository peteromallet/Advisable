# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::Guild::ResolveGuildPost do
  let(:specialist) { create(:specialist) }
  let(:guild_post) { create(:guild_post, specialist:) }
  let(:query) do
    <<-GRAPHQL
    mutation {
      resolveGuildPost(input: {
        guildPostId: "#{guild_post.id}",
      }) {
        success
      }
    }
    GRAPHQL
  end

  it "errors if current_user is not the author" do
    other = create(:specialist)
    resp = AdvisableSchema.execute(query, context: {current_user: other})
    error = resp["errors"].first["extensions"]["code"]
    expect(error).to eq("NOT_AUTHORIZED")
  end

  describe "resolving a post" do
    subject(:resolve_post) do
      AdvisableSchema.execute(query, context: {current_user: specialist})
    end

    it "marks as resolved" do
      freeze_time do
        expect do
          resolve_post
          guild_post.reload
        end.to change(guild_post, :resolved_at).from(nil).to(Time.current)
      end
    end

    it "includes if it was successful" do
      expect(resolve_post.dig("data", "resolveGuildPost", "success")).to eq(true)
    end
  end
end
