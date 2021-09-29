# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Guild view post", type: :system do
  let(:account) { create(:account, completed_tutorials: ["guild"]) }
  let(:specialist) { create(:specialist, guild: true, account: account) }
  let!(:guild_post) { create(:guild_post, shareable: false, title: "This is a test post") }
  let(:post_path) { "/guild/posts/#{guild_post.id}" }

  context "when not logged in" do
    it "is redirected to login page" do
      visit(post_path)
      expect(page).to have_content("Please sign in to your account")
    end

    it "is not redirected to login page when post is public" do
      guild_post.update!(shareable: true)
      visit(post_path)
      expect(page).not_to have_content("Please sign in to your account")
      expect(page).to have_content(guild_post.title)
    end
  end

  context "when logged in" do
    before do
      authenticate_as(specialist)
    end

    it "has a not found notice if there is no post" do
      visit("#{post_path}123")
      expect(page).to have_content("Post not found")
    end

    it "displays the post" do
      visit(post_path)
      expect(page).to have_content(guild_post.title)
    end
  end
end
