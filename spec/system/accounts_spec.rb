# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Accounts", type: :system do
  it "User can logout" do
    user = create(:user)
    authenticate_as(user)
    visit("/explore")
    expect(page).to have_content("Your feed")
    first("*[data-testid=account-dropdown]").click
    click_link("Logout")
    expect(page).to have_current_path("/login")
  end

  it "Freelancer can logout" do
    specialist = create(:specialist)
    authenticate_as(specialist)
    visit("/")
    expect(page).to have_content("Welcome back")
    first("*[data-testid=account-dropdown]").click
    click_link("Logout")
    expect(page).to have_current_path("/login")
  end
end
