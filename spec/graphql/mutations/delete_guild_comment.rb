require 'rails_helper'

describe Mutations::Guild::CreateComment do
  let(:specialist) { create(:specialist, :guild) }
  let(:guild_comment) { create(:guild_comment, :with_guild_post, specialist: specialist) }

  let(:query) {
    <<-GRAPHQL
      mutation {
        deleteGuildComment(input: {
          guildCommentId: "#{guild_comment.id}"
        }) {
          guildCommentId
        }
      }
    GRAPHQL
  }

  context "with an unauthorized user" do 
    let(:non_guild_specialist) { build(:specialist) }
    let(:guild_specialist) { build(:specialist, :guild) }
    
    describe "non guild user" do
      it "returns a null guild comment" do
        resp = AdvisableSchema.execute(
          query, 
          context: { current_user: non_guild_specialist }
        )
        expect(resp.dig("data", "deleteGuildComment", "guildCommentId")).to be_nil
      end

      it "errors when the specialist didn't create the comment" do
        resp = AdvisableSchema.execute(
          query, 
          context: { current_user: guild_specialist }
        )
        expect(guild_comment.specialist_id).to_not eq(guild_specialist.id)
        error = resp["errors"][0]
        expect(error.dig("extensions", "code")).to eq("notAuthorized")
      end
    end
  end

  context "with an authorized user" do
    let(:guild_post) { guild_comment.post }

    subject(:delete_guild_post) do
      resp = AdvisableSchema.execute(query, context: { current_user: specialist })
      resp.dig("data", "deleteGuildComment")
    end

    it "deletes a guild comment" do
      expect(guild_post.comments_count).to eq(1)
      expect { subject }.to change { guild_post.reload.comments_count }.from(1).to(0)
      expect(subject["guildCommentId"]).to eq(guild_comment.id)
    end

    it "deletes a child comment" do
      parent_comment = create(:guild_comment, parent_comment_id: nil, post: guild_post)
      child_comment = guild_comment.update!(parent_comment_id: parent_comment.id)

      expect {
        subject
      }.to change { parent_comment.child_comments.count }.from(1).to(0)
    end
  end
end

