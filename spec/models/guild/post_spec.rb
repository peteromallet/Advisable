# frozen_string_literal: true

require "rails_helper"

RSpec.describe Guild::Post, type: :model do
  let(:guild_post) { create(:guild_post) }
  let(:specialist) { build(:specialist) }
  let(:guild_comments) { build_list(:guild_comment, 2) }

  describe "db columns" do
    it { expect(guild_post).to have_db_column :id }
    it { expect(guild_post).to have_db_column :type }
    it { expect(guild_post).to have_db_column :body }
    it { expect(guild_post).to have_db_column :title }
    it { expect(guild_post).to have_db_column :status }
    it { expect(guild_post).to have_db_column :reactionable_count }
    it { expect(guild_post).to have_db_column :comments_count }
    it { expect(guild_post).to have_db_column :pinned }
  end

  describe "relationships" do
    it { expect(guild_post).to belong_to(:specialist) }
    it { expect(guild_post).to belong_to(:post_prompt).optional(true) }
    it { expect(guild_post).to have_many(:reactions) }
    it { expect(guild_post).to have_many(:comments).conditions(status: Guild::Comment.statuses["published"]) }
    it { expect(guild_post).to have_many(:labels) }
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

  describe "with audience type" do
    before do
      guild_post.labels = %w[foo bar baz].map { |n| Label.find_or_create_by!(name: n) }
      guild_post.update!(audience_type: "skills")
    end

    it "resets the guild labels when the audience type changes" do
      expect(guild_post.reload.labels.count).to eq(3)
      expect do
        guild_post.update!(audience_type: "industries")
      end.to change(guild_post, :labels).by([])
    end

    it "does not reset the guild labels if the audience type does not change" do
      expect do
        guild_post.update!(audience_type: guild_post.audience_type, title: "some other title")
      end.not_to change(guild_post.reload, :labels)
    end
  end

  describe "with a pinned post" do
    let(:pinned_post) { create(:guild_post, pinned: true) }

    it "will change the previously pinned post" do
      expect do
        guild_post.update!(pinned: true)
        pinned_post.reload
      end.to change(pinned_post, :pinned).from(true).to(false)
    end
  end

  describe "boost" do
    let(:post) { create(:guild_post, status: "published") }

    it "errors when it's not published" do
      expect do
        post.draft!
        post.boost!
      end.to raise_error(Guild::Post::BoostError, "Cannot boost unpublished post")
    end

    it "errors when there are no labels" do
      expect do
        post.boost!
      end.to raise_error(Guild::Post::BoostError, "Cannot boost a post with zero labels")
    end

    it "errors when it's already boosted" do
      expect do
        post.update(boosted_at: Time.current)
        post.boost!
      end.to raise_error(Guild::Post::BoostError, "Post is already boosted")
    end

    it "updates boosted_at and enqueues a job" do
      post.labels = [Label.find_or_create_by(name: "foo")]
      post.save

      expect do
        post.boost!
      end.to change(post, :boosted_at)
      expect(GuildPostBoostedJob).to have_been_enqueued.with(post.id)
    end
  end

  describe "popular posts" do
    subject(:popular_posts) { described_class.popular }

    let!(:post_a) do
      create(:guild_post, engagements_count: 0, reactionable_count: 1)
    end

    let!(:post_b) do
      create(:guild_post, engagements_count: 1, reactionable_count: 2)
    end

    it "orders by the sum of reactions and engagements" do
      expect(popular_posts.map(&:rank)).to eq([
                                                post_b.engagements_count + post_b.reactionable_count,
                                                post_a.engagements_count + post_a.reactionable_count
                                              ])

      post_a.update!(reactionable_count: 99)
      post_a.reload
      expect(described_class.popular.first).to eq(post_a)
    end

    it "does not include unpublished" do
      unpublished = create(:guild_post, status: "draft", engagements_count: 100, reactionable_count: 100)
      expect(popular_posts).not_to include(unpublished)
      expect(popular_posts).to eq([post_b, post_a])
    end

    it "does not include posts older than two weeks" do
      post_b.update!(created_at: 3.weeks.ago)
      expect(popular_posts).not_to include(post_b)
    end

    it "does not include unresolved posts" do
      post_a.update!(resolved_at: 1.day.ago)
      expect(popular_posts).not_to include(post_a)
    end
  end
end
