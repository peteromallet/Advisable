# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Deleting account", type: :system do
  let(:specialist) { create(:specialist, account: create(:account, password: "testing123")) }
  let(:user) { create(:user, account: create(:account, password: "testing123")) }

  before do
    allow_any_instance_of(Specialist).to receive(:sync_to_airtable)
    allow_any_instance_of(User).to receive(:sync_to_airtable)
  end

  it "allows specialist to delete their account" do
    visit "/login"
    fill_in "email", with: specialist.account.email
    fill_in "password", with: "testing123"
    click_on "Login"
    expect(page).to have_content("Welcome back")

    visit "/settings/account"
    click_on "Delete account"
    within "*[data-dialog]" do
      fill_in "confirm", with: "DELETE"
      click_on "Delete account"
    end

    expect(page).to have_content("Please sign in to your account")
    fill_in "email", with: specialist.account.email
    fill_in "password", with: "testing123"
    click_on "Login"
    expect(page).to have_content("Invalid login credentials, please try again.")
  end

  it "allows user to delete their account" do
    visit "/login"
    fill_in "email", with: user.account.email
    fill_in "password", with: "testing123"
    click_on "Login"
    expect(page).to have_content(/your feed/i)

    visit "/settings/account"
    click_on "Delete account"
    within "*[data-dialog]" do
      fill_in "confirm", with: "DELETE"
      click_on "Delete account"
    end

    expect(page).to have_content("Please sign in to your account")
    fill_in "email", with: user.account.email
    fill_in "password", with: "testing123"
    click_on "Login"
    expect(page).to have_content("Invalid login credentials, please try again.")
  end
end
