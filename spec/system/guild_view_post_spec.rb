# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Guild view post", type: :system do
  let(:account) { create(:account) }
  let(:specialist) { create(:specialist, guild: true, account:) }
  let!(:guild_post) { create(:guild_post, shareable: false, title: "This is a test post") }
  let(:post_path) { "/posts/#{guild_post.id}" }

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
      expect(page).to have_content("The page you were looking for could not be found")
    end

    it "displays the post" do
      visit(post_path)
      expect(page).to have_content(guild_post.title)
    end

    it "allows the freelancer to connect with the author" do
      visit(post_path)
      expect(page).to have_content(guild_post.title)
      first(:button, "Connect with #{guild_post.specialist.account.first_name}").click
      find_by_test_id("Send #{guild_post.specialist.account.first_name} a message").click
      fill_in("message", with: "Testing")
      click_on("Send")
      expect(page).to have_content(/your message has been sent/i)
    end

    it "allows the freelancer to request a call with the author" do
      visit(post_path)
      expect(page).to have_content(guild_post.title)
      first(:button, "Connect with #{guild_post.specialist.account.first_name}").click
      find_by_test_id("Request call with #{guild_post.specialist.account.first_name}").click
      fill_in("message", with: "Testing")
      fill_in("guildCalendlyLink", with: "https://calendly.com/test")
      click_on("Send")
      expect(page).to have_content(/your message has been sent/i)
    end
  end
end
