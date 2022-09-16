# frozen_string_literal: true

require "rails_helper"

RSpec.describe "User settings" do
  it "allows user to upload, update, and delete avatar" do
    account = create(:account, password: "testing123", first_name: "Sam", last_name: "One")
    user = create(:user, account:)
    authenticate_as user
    visit "/settings/account"
    expect(page).to have_content("Upload profile picture")
    attach_file(
      "upload-avatar",
      Rails.root.join("spec/support/01.jpg"),
      make_visible: true
    )
    expect(page).to have_selector("img[alt='Sam One’s avatar']")
    attach_file(
      "upload-avatar",
      Rails.root.join("spec/support/02.jpg"),
      make_visible: true
    )
    click_on("Delete profile picture")
    wait_until do
      expect(page).not_to have_selector("img[alt='Sam One’s avatar']")
    end
    wait_until do
      expect(page).to have_content("Upload profile picture")
    end
  end

  it "allows user to change their password" do
    account = create(:account, password: "testing123")
    user = create(:user, account:)
    authenticate_as user
    visit "/settings/password"
    fill_in "currentPassword", with: "testing123"
    fill_in "password", with: "changed123"
    fill_in "passwordConfirmation", with: "changed123"
    click_on "Update password"
    expect(page).to have_content("password has been updated")
    expect(account.authenticate("changed123")).to be_truthy
  end

  it "allows the user to change their email subscription preferences" do
    user = create(:user)
    authenticate_as(user)
    visit("/settings/notifications")
    expect(user.account.unsubscribed_from).not_to include("Announcements")
    toggle = find("*[data-test-id='Announcements'] input")
    toggle.click
    expect(page).to have_content("Your settings have been updated.")
    expect(user.account.unsubscribed_from).to include("Announcements")
    toggle.click
    expect(page).to have_content("Your settings have been updated.")
  end
end
