# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Guild topics" do
  let(:specialist) { create(:specialist) }
  let!(:design) { create(:label, name: "Design") }

  it "allows specialist to follow new topics" do
    authenticate_as(specialist)
    visit("/guild/topics")
    expect(page).to have_content(design.name)
    topics = find_by_test_id("your-topics")
    click_on(design.name)
    expect(topics).to have_content(design.name)
  end

  it "allows specialist to unfollow topics" do
    specialist.subscribe_to!(design)
    authenticate_as(specialist)
    visit("/guild/topics")
    expect(page).to have_content(design.name)
    click_on("Remove #{design.name}")
    topics = find_by_test_id("your-topics")
    expect(topics).not_to have_content(design.name)
  end
end
