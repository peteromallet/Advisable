# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Guild feed', type: :system do
  let(:specialist) { create(:specialist, :guild) }
  let(:author) { create(:specialist, :guild) }
  let!(:post) { create(:guild_post, specialist: author) }

  it 'viewer can message post author' do
    specialist.account.update!(completed_tutorials: ["GUILD"])
    authenticate_as(specialist)
    visit "/guild/feed"
    expect(page).to have_content(post.title)
    author_name = author.account.first_name
    find("button[aria-label=\"Connect with #{author_name}\"]").click
    find("*[aria-label=\"Send #{author_name} an instant message\"]").click
    fill_in :message, with: "Hey!"
    click_on "Send"
    expect(page).to have_content("Your message has been sent to #{author_name}")
  end
end
