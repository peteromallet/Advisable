# frozen_string_literal: true

require "rails_helper"

RSpec.describe Guild::Post, type: :model do
  let(:guild_post) { create(:guild_post) }
  let(:specialist) { build(:specialist) }

  describe "db columns" do
    it { expect(guild_post).to have_db_column(:id) }
    it { expect(guild_post).to have_db_column(:type) }
    it { expect(guild_post).to have_db_column(:body) }
    it { expect(guild_post).to have_db_column(:title) }
    it { expect(guild_post).to have_db_column(:status) }
    it { expect(guild_post).to have_db_column(:pinned) }
  end

  describe "relationships" do
    it { expect(guild_post).to belong_to(:specialist) }
    it { expect(guild_post).to have_many(:labels) }
    it { expect(guild_post).to have_many(:images) }
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
end
