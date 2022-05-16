# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Accounts", type: :system do
  let(:account) { create(:account, password: "testing123", completed_tutorials: %w[onboarding feed]) }

  it "User can logout" do
    create(:user, account:)
    visit("/login")
    fill_in("email", with: account.email)
    fill_in("password", with: "testing123")
    click_on("Login")
    expect(page).to have_content("Your feed")
    first("*[data-testid=account-dropdown]").click
    click_link("Logout")
    expect(page).to have_current_path("/login")
  end

  it "Freelancer can logout" do
    create(:specialist, account:)
    visit("/login")
    fill_in("email", with: account.email)
    fill_in("password", with: "testing123")
    click_on("Login")
    expect(page).to have_content("Welcome back")
    first("*[data-testid=account-dropdown]").click
    click_link("Logout")
    expect(page).to have_current_path("/login")
  end
end
