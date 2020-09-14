# frozen_string_literal: true

require "rails_helper"

RSpec.describe Guild::Comment, type: :model do
  let(:guild_comment) { create(:guild_comment, :with_guild_post) }

  describe "db columns" do
    it { expect(guild_comment).to have_db_column :id }
    it { expect(guild_comment).to have_db_column :body }
    it { expect(guild_comment).to have_db_column :data }
    it { expect(guild_comment).to have_db_column :status }
  end

  describe "relationships" do
    it { expect(guild_comment).to belong_to(:specialist) }
    it { expect(guild_comment).to belong_to(:post) }
    it { expect(guild_comment).to belong_to(:parent_comment).class_name('Guild::Comment').optional(true) }
    it { expect(guild_comment).to have_many(:reactions) }
    it { expect(guild_comment).to have_many(:child_comments) }
  end

  describe "create callbacks" do
    it "is set to published" do
      comment = build(:guild_comment)
      expect(comment.published?).to_not be
      expect { comment.save }.to change { 
        comment.status
      }.from("draft").to("published")
    end

    it "sets the child comment's post from the parent when present" do
      parent_comment = create(:guild_comment, :with_guild_post)
      child_comment = build(:guild_comment, parent_comment: parent_comment)

      expect { child_comment.save }.to change {
        child_comment.post
      }.from(nil).to(parent_comment.post)
    end
  end
end
