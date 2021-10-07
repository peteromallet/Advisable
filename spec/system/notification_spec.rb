# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Notification', type: :system do
  let(:specialist) { create(:specialist, :guild) }
  let(:other_specialist) { create(:specialist, :guild) }
  let(:unread_selector) { "//div[@data-testid='unreadNotifications']" }
  let!(:post) { create(:guild_post, specialist: specialist) }

  before do
    specialist.account.update!(completed_tutorials: ["guild"])
    reaction = post.reactions.create!(specialist: other_specialist)
    reaction.create_notification!
    authenticate_as(specialist)
  end

  it "has an unread icon if notifications are unread" do
    visit "/guild/feed"
    expect(page).to have_selector(:xpath, unread_selector)
  end

  it "displays all notifications as read when read" do
    notification = specialist.account.notifications.last
    notification.update!(read_at: Time.zone.at(0))

    visit "/guild/feed"
    expect(page).not_to have_selector(:xpath, unread_selector)
  end

  it "changes notifications as being read and displays a notification" do
    visit "/guild/feed"
    expect(page).to have_selector(:xpath, unread_selector)
    find(:xpath, unread_selector).click
    expect(page).not_to have_selector(:xpath, unread_selector)

    expect(page).to have_content("found your post interesting")
  end

  it "has a suggested_post notification" do
    suggested_post = create(:guild_post, specialist: other_specialist)
    specialist.account.notifications.create!(
      action: 'suggested_post',
      notifiable: suggested_post
    )

    visit "/guild/feed"
    find(:xpath, unread_selector).click
    expect(page).to have_content("You have a new suggested Post")
  end
end
