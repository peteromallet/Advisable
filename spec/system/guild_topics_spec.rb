# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Guild topics", type: :system do
  let(:account) { create(:account, completed_tutorials: ["GUILD"]) }
  let(:specialist) { create(:specialist, guild: true, account: account) }

  it "users can browse and follow guild topics" do
    topic = create(:guild_topic, name: "Test Topic")
    post = create(:guild_post, title: "Test post")
    post.guild_topics << topic
    authenticate_as(specialist)
    visit("/guild/topics/test-topic")
    expect(page).to have_content("Test post")
    click_on("Follow")
    expect(page).to have_content("Unfollow")
  end

  it "users can unfollow guild topics" do
    topic = create(:guild_topic, name: "Test Topic")
    specialist.follow(topic)
    authenticate_as(specialist)
    visit("/guild/topics/test-topic")
    click_on("Unfollow")
    expect(page).to have_content("Follow")
  end
end
