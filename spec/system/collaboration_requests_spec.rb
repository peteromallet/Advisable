# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Collaboration requests", type: :system do
  let!(:design) { create(:label, :with_skill, name: "Design") }
  let!(:finance) { create(:label, :with_industry, name: "Finance") }
  let!(:ireland) { create(:label, :with_country, name: "Ireland") }

  it "Specialist can post a new collaboration request" do
    specialist = create(:specialist)
    authenticate_as(specialist)
    visit("/")
    click_button("Post")
    fill_in("title", with: "This is my post title")
    find(".public-DraftEditor-content").base.send_keys("This is the post body")
    dropdown = find_field("Skills, industries, locations...")
    dropdown.send_keys("Des")
    expect(page).to have_content("Design")
    dropdown.send_keys(:enter, :backspace, :backspace, :backspace, "Fin")
    expect(page).to have_content("Finance")
    dropdown.send_keys(:enter, :backspace, :backspace, :backspace, "Ire")
    expect(page).to have_content("Ireland")
    dropdown.send_keys(:enter)
    click_on("Publish")

    expect(page).to have_current_path("/")
    expect(page).to have_content("This is my post title")
    post = Guild::Post.last
    labels = post.labels.map(&:name)
    expect(labels).to include(design.name)
    expect(labels).to include(ireland.name)
    expect(labels).to include(finance.name)
  end

  it "Specialist can edit their post" do
    post = create(:opportunity_guild_post)
    post.labels << design
    authenticate_as(post.specialist)
    visit("/posts/#{post.id}")
    first(:button, "Edit").click
    fill_in("title", with: "Updated post title")
    click_on("Save changes")
    expect(page).to have_current_path("/posts/#{post.id}")
    expect(page).to have_content("Updated post title")
  end

  it "Can only edit if viewer is the author" do
    post = create(:opportunity_guild_post)
    specialist = create(:specialist)
    authenticate_as(specialist)
    visit("/posts/#{post.id}/edit")
    expect(page).to have_current_path("/posts/#{post.id}")
  end
end
