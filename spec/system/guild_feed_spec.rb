# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Guild feed', type: :system do
  let(:specialist) { create(:specialist, :guild) }
  let(:author) { create(:specialist, :guild) }
  let(:author_name) { author.account.first_name }
  let!(:post) { create(:guild_post, pinned: true, specialist: author) }
  let!(:posts) { create_list(:guild_post, 4, engagements_count: 1) }

  before do
    specialist.account.update!(completed_tutorials: ["guild"])
    authenticate_as(specialist)
    allow(ChatDirectMessageJob).to receive(:perform_later)
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
      posts.last.update(type: "Opportunity", resolved_at: 3.weeks.ago, reactionable_count: Guild::Post::POPULAR_THRESHOLD)
      visit "/guild/feed"
      author_name = posts.last.account.first_name
      expect(page).to have_content("#{author_name} found the connection they were looking for from this post.")
      expect(page).not_to have_content("Many people found this post interesting")
    end

    it "includes a pinned post at the top if there is one" do
      visit "/guild/feed"
      post.update!(pinned: true, reactionable_count: Guild::Post::POPULAR_THRESHOLD)
      expect(page).to have_content("This post has been pinned by the Advisable team")
      expect(page).not_to have_content("Many people found this post interesting")
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

    context "with interesting posts" do
      let(:threshold) { Guild::Post::POPULAR_THRESHOLD }

      it "includes a post many people have found interesting" do
        posts.last.update!(specialist: create(:specialist, :guild), created_at: 3.weeks.ago, reactionable_count: threshold)
        visit "/guild/feed"
        expect(page).to have_content("Many people found this post interesting")
      end

      it "includes the number of reactions for the author" do
        posts.last.update!(specialist: specialist, created_at: 3.weeks.ago, reactionable_count: threshold)
        visit "/guild/feed"
        expect(page).to have_content("#{threshold} people have found your post interesting")
      end
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
