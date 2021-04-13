# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Story box', type: :system do
  let(:account)    { create(:account, completed_tutorials: ["guild"]) }
  let(:specialist) { create(:specialist, :guild, account: account) }
  let(:label) { create(:label, description: "This is a description") }
  let(:post_prompt) do
    create(:post_prompt, featured: true, cta: "prompt cta", prompt: "edit this text please", label: label)
  end

  before do
    authenticate_as(specialist)
    create_list(:guild_post, 6, post_prompt: post_prompt, labels: [label])
  end

  it "has a story box" do
    visit "/guild/feed"
    expect(page).to have_content(label.description)
    expect(page).to have_content(label.slug)
    expect(page).to have_button("View all")

    posts = find_all(:xpath, ".//div[@data-testid='labelPost']")
    expect(posts.size).to eq(5)

    click_on post_prompt.cta

    expect(page).to have_current_path("/guild/composer/prompt/#{post_prompt.id}")
    expect(page).to have_content(post_prompt.prompt)
    title = "This is a title for a prompt post"
    fill_in :title, with: title

    click_on 'Continue'
    expect(page).to have_content("Add images to this post")
  end
end
