# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Guild feed', type: :system do
  let(:specialist) { create(:specialist, :guild) }
  let(:author) { create(:specialist, :guild) }
  let(:author_name) { author.account.first_name }

  let!(:post) { create(:guild_post, specialist: author) }

  before do
    specialist.account.update!(completed_tutorials: ["GUILD"])
    authenticate_as(specialist)
  end

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

  it 'displays text to copy a referral link' do
    visit "/guild/feed"
    expect(page).to have_content("Share this link with them and we’ll be in touch!")
    find(:xpath, '//div[text() = "Copy Link"]').click
    expect(page).to have_content("Copied to clipboard")
  end
end
