# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Guild feed', type: :system do
  let(:specialist) { create(:specialist, :guild) }
  let(:author) { create(:specialist, :guild) }
  let(:author_name) { author.account.first_name }
  let!(:post) { create(:guild_post, pinned: true, specialist: author) }

  before do
    create_list(:guild_post, 6, engagements_count: 1)
    specialist.account.update!(completed_tutorials: ["GUILD"])
    authenticate_as(specialist)
  end

  context "when viewing the default feed" do
    it 'viewer can message post author' do
      visit "/guild/feed"
      expect(page).to have_content(post.title)
      find("button[aria-label=\"Connect with #{author_name}\"]").click
      find("*[aria-label=\"Send #{author_name} an instant message\"]").click
      fill_in :message, with: "Hey!"
      click_on "Send"
      expect(page).to have_content("Your message has been sent to #{author_name}")
    end

    it 'includes a notice that post is resolved' do
      post.update(type: "Opportunity", resolved_at: Time.current)
      visit "/guild/feed"
      expect(page).to have_content("#{author_name} found the connection they were looking for from this post.")
    end

    it "includes a pinned post at the top if there is one" do
      visit "/guild/feed"
      expect(page).to have_content("This post has been pinned by the Advisable team")
    end

    it "does not include a pinned post if there isn't one" do
      post.update!(pinned: false)
      visit "/guild/feed"
      expect(page).not_to have_content("This post has been pinned by the Advisable team")
    end

    it "includes popular and latest posts section" do
      visit "/guild/feed"

      post_children = lambda { |search_text|
        "//div[contains(text(), \"#{search_text}\")]//following-sibling::*//child::*[@data-testid=\"post\"]"
      }

      expect(page).to have_content("POPULAR POSTS")
      popular_posts = all(:xpath, post_children["Popular Posts"])
      expect(popular_posts.size).to eq(3)

      expect(page).to have_content("LATEST POSTS")
      latest_posts = all(:xpath, post_children["Latest Posts"])
      expect(latest_posts.size).to eq(4)
    end
  end

  context "when filtering the feed" do
    it "does not include popular and latest headings" do
      visit "/guild/feed"

      find("*[aria-label=\"Toggle post filters\"]").click
      find(:xpath, "//div[contains(text(), 'Case Study')]").click

      expect(page).not_to have_content("POPULAR POSTS")
      expect(page).not_to have_content("LATEST POSTS")
    end
  end

  it 'displays text to copy a referral link' do
    visit "/guild/feed"
    expect(page).to have_content("Share this link with them and we’ll be in touch!")
    find(:xpath, '//div[text() = "Copy Link"]').click
    expect(page).to have_content("Copied to clipboard")
  end
end
