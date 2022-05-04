# frozen_string_literal: true

require "rails_helper"

RSpec.describe "User settings" do
  it "allows user to change their password" do
    account = create(:account, password: "testing123")
    user = create(:user, account:)
    authenticate_as user
    visit "/settings/account"
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
