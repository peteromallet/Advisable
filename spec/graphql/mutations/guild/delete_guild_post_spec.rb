require 'rails_helper'

RSpec.describe Mutations::Guild::DeleteGuildPost do
  let(:specialist) { create(:specialist, :guild) }
  let!(:guild_post) { create(:guild_post, specialist: specialist) }

  let(:query) {
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
  }

  it "deletes a guild post" do
    expect {
      r = AdvisableSchema.execute(query, context: {current_user: specialist})
    }.to change { Guild::Post.count }.from(1).to(0)
  end

  it "does not delete a post that doesnt belong to current_user" do
    expect {
      AdvisableSchema.execute(query, context: {current_user: create(:specialist, :guild)})
    }.not_to change(Guild::Post, :count)
  end
end
