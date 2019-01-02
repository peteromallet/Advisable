require "rails_helper"

describe "Signing up as a new user" do
  it "shows the user the account confirmation flow" do
    visit "/signup"
    fill_in "email", with: "#{Time.now.to_i}@test.com"
    fill_in "password", with: "testing123"
    fill_in "passwordConfirmation", with: "testing123"
    click_on "Signup"
    expect(page).to have_content("Please confirm your account")
  end
end