# frozen_string_literal: true

require "rails_helper"

RSpec.describe Guild::Post, type: :model do
  include ActiveJob::TestHelper

  let(:guild_post) { create(:guild_post) }
  let(:specialist) { build(:specialist) }
  let(:guild_comments) { build_list(:guild_comment, 2) }

  describe "db columns" do
    it { expect(guild_post).to have_db_column :id }
    it { expect(guild_post).to have_db_column :type }
    it { expect(guild_post).to have_db_column :body }
    it { expect(guild_post).to have_db_column :body_raw }
    it { expect(guild_post).to have_db_column :title }
    it { expect(guild_post).to have_db_column :data }
    it { expect(guild_post).to have_db_column :status }
    it { expect(guild_post).to have_db_column :reactionable }
    it { expect(guild_post).to have_db_column :commentable }
    it { expect(guild_post).to have_db_column :reactionable_count }
    it { expect(guild_post).to have_db_column :comments_count }
  end

  describe "relationships" do
    it { expect(guild_post).to belong_to(:specialist) }
    it { expect(guild_post).to have_many(:reactions) }
    it { expect(guild_post).to have_many(:comments).conditions(status: Guild::Comment.statuses["published"]) }
  end

  describe "with comments" do
    let(:specialists) { build_list(:specialist, 2) }

    it "can have multiple comments" do
      expect(guild_post.comments).to be_empty
      guild_post.comments << guild_comments

      expect(guild_post.comments.size).to eq(2)
    end

    it "can have multiple comments from different specialists" do
      expect(guild_post.comments).to be_empty
      guild_post.comments << build(:guild_comment, specialist: specialists.first)
      guild_post.comments << build(:guild_comment, specialist: specialists.last)

      expect(guild_post).to be_valid
      expect(guild_post.comments.size).to eq(2)
      expect(guild_post.reload.comments.pluck(:specialist_id).uniq.size).to eq(2)
    end

    it "can have multiple comments from the same specialist" do
      expect(guild_post.comments).to be_empty
      guild_post.comments << build(:guild_comment, specialist: specialist)
      guild_post.comments << build(:guild_comment, specialist: specialist)

      expect(guild_post.comments.size).to eq(2)
      expect(guild_post.comments.pluck(:specialist_id).uniq.size).to eq(1)
    end

    it "does not include comments that are not published" do
      expect(guild_post.comments).to be_empty
      guild_comment = create(:guild_comment, specialist: specialist, post: guild_post)
      guild_comment.draft!

      expect(guild_post.comments).to eq([])
      expect(guild_post.comments.unscoped).to eq([guild_comment])
    end
  end

  describe "with reactions" do
    it "can have multiple reactions from different specialists" do
      expect(guild_post.reactions).to be_empty
      guild_post.reactions << build(:guild_reaction)
      guild_post.reactions << build(:guild_reaction)

      expect(guild_post.reactions.size).to eq(2)
      expect(guild_post.reactions.pluck(:specialist_id).uniq.size).to eq(2)
    end

    it "cannot have multiple reactions from a single specialist" do
      expect(guild_post.reactions).to be_empty
      reactions = build_list(:guild_reaction, 2, specialist: specialist)
      guild_post.reactions << reactions.first
      guild_post.reactions << reactions.last

      expect(guild_post.reactions.pluck(:specialist_id).uniq.size).to eq(1)
    end
  end

  describe "with nested comments" do
    it "can comments with child comments" do
      expect(guild_post.comments).to be_empty

      parent_comment = guild_comments.last
      guild_post.comments << parent_comment

      # add a comment that has a parent
      child_comment = parent_comment.child_comments.build(specialist: specialist, body: "child comment")
      child_comment.save!

      expect(guild_post.reload.comments.size).to eq(2)
      expect(guild_post.parent_comments.size).to eq(1)
      expect(parent_comment.reload.child_comments).to eq([child_comment])
    end
  end
end
