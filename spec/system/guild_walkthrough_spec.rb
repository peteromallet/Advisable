# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Guild walkthrough", type: :system do
  let(:account) { create(:account, completed_tutorials: []) }
  let(:specialist) { create(:specialist, guild: true, account: account) }

  it "users can browse and follow guild topics" do
    create(:guild_post, title: "Test post")
    authenticate_as(specialist)
    visit("/guild")
    expect(page).to have_content("Welcome")
    # need to sleep while page loads
    sleep 1
    click_on("Next")
    expect(page).to have_content("Post with purpose")
    click_on("Next")
    expect(page).to have_content("vanity metrics")
    click_on("Next")
    expect(page).to have_content("No comments")
    click_on("Next")
    expect(page).to have_content("Subscribe to topics")
    click_on("Next")
    expect(page).to have_content("That’s it!")
    click_on("Okay")
  end
end
