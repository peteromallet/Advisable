# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Logging in", type: :system do
  it "redirects the user back to where they tried to go" do
    user = create(:user, account: create(:account, password: "testing123"))
    visit "/hire"
    fill_in "email", with: user.account.email
    fill_in "password", with: "testing123"
    click_on "Login"
    expect(page).to have_current_path("/hire")
  end
end
