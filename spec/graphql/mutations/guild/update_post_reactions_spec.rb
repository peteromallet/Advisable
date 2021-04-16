# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::Guild::UpdatePostReactions do
  subject(:guild_update_post_reactions) do
    resp = AdvisableSchema.execute(query, context: {current_user: specialist})
    resp.dig("data", *response_keys)
  end

  let(:specialist) { create(:specialist, :guild) }
  let(:guild_post) { create(:guild_post) }
  let(:response_keys) { %w[guildUpdatePostReactions guildPost] }
  let(:reaction) { "THANK" }
  let(:query) do
    <<-GRAPHQL
    mutation {
      guildUpdatePostReactions(input: {
        guildPostId: "#{guild_post.id}"
        reaction: #{reaction},
      }) {
        guildPost {
          reacted
          reactionsCount
        }
      }
    }
    GRAPHQL
  end

  it_behaves_like "guild specialist"

  describe "giving thanks for a post" do
    it "creates a new thanks reaction for a post" do
      expect { guild_update_post_reactions }.to change { guild_post.reload.reactionable_count }.from(0).to(1)
      expect(guild_update_post_reactions).to include({
        "reacted" => true,
        "reactionsCount" => nil
      })
    end

    it "is idempotent" do
      guild_post.reactions.create(specialist: specialist)
      expect { guild_update_post_reactions }.not_to(change { guild_post.reload.reactionable_count })
      expect(guild_update_post_reactions).to include({
        "reacted" => true,
        "reactionsCount" => nil
      })
    end
  end

  describe "removing thanks for a post" do
    let(:reaction) { "NONE" }

    it "removes an existing reaction for a post" do
      guild_post.reactions.create(specialist: specialist)
      expect(guild_post.reactionable_count).to eq(1)
      expect { guild_update_post_reactions }.to change { guild_post.reload.reactionable_count }.from(1).to(0)
      expect(guild_update_post_reactions).to include({
        "reacted" => false,
        "reactionsCount" => nil
      })
    end

    it "is idempotent" do
      expect { guild_update_post_reactions }.not_to(change { guild_post.reload.reactionable_count })
      expect(guild_update_post_reactions).to include({
        "reacted" => false,
        "reactionsCount" => nil
      })
    end
  end

  it "only updates the post reaction for the current_user" do
    specialists = create_list(:specialist, 5, :guild)
    specialists.each { |s| guild_post.reactions.create(specialist: s) }
    expect(guild_post.reactionable_count).to eq(5)

    expect { guild_update_post_reactions }.to change { guild_post.reload.reactionable_count }.from(5).to(6)
    expect(guild_post.reload.reactions.where(specialist: specialist).count).to eq(1)
    expect(guild_update_post_reactions).to include({
      "reacted" => true,
      "reactionsCount" => nil
    })
  end

  it "only includes the reactionsCount for the author" do
    guild_post.update(specialist: specialist)
    expect(guild_update_post_reactions).to include({"reactionsCount" => 1})
  end

  describe "notifications" do
    it "creates a post_reaction notification when created" do
      expect do
        guild_update_post_reactions
      end.to change(Notification, :count).from(0).to(1)

      notification = guild_post.specialist.account.notifications.first
      expect(notification).to have_attributes({
        account: guild_post.account,
        actor: specialist.account,
        action: "post_reaction",
        notifiable: Guild::Reaction.first
      })
    end

    it "does not create duplicate notifications" do
      expect do
        guild_update_post_reactions
        guild_update_post_reactions
      end.to change(Notification, :count).from(0).to(1)
    end
  end
end
