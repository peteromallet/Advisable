# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Guild post delete action", type: :system do
  let(:specialist) { create(:specialist) }
  let(:author) { create(:specialist) }
  let!(:post) { create(:guild_post, specialist: author) }

  it "allows the author to delete their post" do
    authenticate_as(author)
    visit "/guild/posts/#{post.id}"
    author.account.first_name
    all("button[aria-label=\"Delete post\"]").first.click
    click_on "Confirm"
    expect(page).to have_content("Deleted guild post")
    expect(Guild::Post.find_by_id(post.id)).to be_nil
  end

  it "is only shown to the author" do
    authenticate_as(specialist)
    visit "/guild/posts/#{post.id}"
    expect(page).to have_content(post.title)
    expect(page).not_to have_selector("*[data-testid=deletePost]")
  end
end
