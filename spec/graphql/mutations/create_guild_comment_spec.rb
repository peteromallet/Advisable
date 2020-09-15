require 'rails_helper'

RSpec.describe Mutations::Guild::CreateComment do
  let(:guild_post) { create(:guild_post) }
  let(:specialist) { build(:specialist, :guild) }

  let(:query) {
    ->(id) {
      <<-GRAPHQL
      mutation {
        createGuildComment(input: {
          guildPostId: "#{id}",
          body: "This is a comment body"
        }) {
          guildComment {
            id
            body
            post {
              id
            }
            author {
              id
            }
          }
        }
      }
      GRAPHQL
    }
  }

  context "with a non guild specialist" do
    let(:non_guild_specialist) { build(:specialist) }

    it "returns a null guild comment" do
      resp = AdvisableSchema.execute(
        query[guild_post.id],
        context: { current_user: non_guild_specialist }
      )
      expect(resp.dig("data", "createGuildComment", "guildComment")).to be_nil
    end
  end

  context "with a guild specialist" do
    subject(:create_guild_comment) do
      resp = AdvisableSchema.execute(
        query[guild_post.id],
        context: { current_user: specialist }
      )
      resp.dig("data", "createGuildComment", "guildComment")
    end

    it "creates a new guild comment" do
      expect { subject }.to change {
        guild_post.reload.comments_count
      }.by(1)
      expect(subject["body"]).to eq("This is a comment body")
    end

    it "creates a comment thats associated with the post" do
      expect(subject.dig("post", "id")).to eq(guild_post.id)
    end

    it "creates a comment belonging to the curret_user specialist" do
      expect(subject.dig("author", "id")).to eq(specialist.uid)
    end

    describe "child comments" do
      let(:guild_post) { create(:guild_post) }
      let(:guild_comment) { create(:guild_comment, post: guild_post) }
      let(:create_child_comment_query) {
        <<-GRAPHQL
        mutation {
          createGuildComment(input: {
            guildPostId: "#{guild_post.id}",
            body: "This is a child comment body",
            guildCommentId: "#{guild_comment.id}"
          }) {
            guildComment {
              id
              parentComment { 
                id
              }
            }
          }
        }
        GRAPHQL
      }
      let(:resp) {
        AdvisableSchema.execute(create_child_comment_query, context: { current_user: specialist })
      }

      it "creates a child comment" do
        expect {
          resp
        }.to change { guild_comment.reload.child_comments.size }.by(1)
      end

      it "has an id thats different than the parent_comment id" do
        data = resp.dig("data", "createGuildComment", "guildComment")

        expect(data.dig("parentComment", "id")).to eq(guild_comment.id)
        expect(data["id"]).to_not eq(guild_comment.id)
      end
    end
  end
end

