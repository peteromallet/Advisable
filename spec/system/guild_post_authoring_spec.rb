# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Create post flow", type: :system do
  let(:specialist) { create(:specialist) }
  let(:title) { Faker::Lorem.sentence(word_count: 12) }
  let(:content) { Faker::Lorem.sentence(word_count: 50) }

  before do
    specialist.account.update!(completed_tutorials: ["guild"])

    create(:skill, name: "Design")
    create(:skill, name: "Development")
  end

  it "allows specialist to create a post" do
    authenticate_as(specialist)
    visit "/guild/feed"
    find("*[aria-label=\"Create a Post\"]").click

    # Post type
    choose "Looking for advice"

    # Form Validation
    fill_in :title, with: "foo"
    find_field(:title).native.send_keys(:tab)
    find(".public-DraftEditor-content").base.send_keys("bar")
    find(".public-DraftEditor-content").base.send_keys(:tab)
    expect(page).to have_content("title must be at least 8 characters")
    expect(page).to have_content("body must be at least 16 characters")

    fill_in :title, with: title
    find(".public-DraftEditor-content").base.send_keys(content)
    click_on "Continue"

    # Images
    attach_file(
      "upload-image",
      Rails.root.join("spec/support/01.jpg"),
      make_visible: true
    )

    attach_file(
      "upload-image",
      Rails.root.join("spec/support/02.jpg"),
      make_visible: true
    )

    expect(page).not_to have_css("*[data-uploading]") # wait for uploads

    # set cover
    second_image = find_all("*[class^=Images__StyledImageTile-]")[1]
    second_image.click

    # test remove image
    within(second_image) { click_on "Remove image" }
    images = find_all("*[class^=Images__StyledImageTile-]")
    expect(images.count).to eq(1)

    click_on "Continue"

    # audience type
    choose "Target by skill"

    # audience settings
    skills = find_field("Search for a skill")
    skills.send_keys("Develop", :down, :enter)
    skills.send_keys("Desi", :down, :enter)
    click_on "Continue"

    # publish
    click_on "Publish Post"

    expect(page).to have_current_path(%r{/guild/posts/.*})
  end
end
