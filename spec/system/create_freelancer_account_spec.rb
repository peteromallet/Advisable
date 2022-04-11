# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Creating a freelancer account", type: :system do
  it "shows the user the account confirmation flow" do
    user = create(:user, account: create(:account, password: nil, confirmed_at: nil, completed_tutorials: ["onboarding"]))
    allow_any_instance_of(User).to receive(:sync_to_airtable)
    visit "/signup/#{user.uid}"
    fill_in "email", with: "#{Time.now.to_i}@test.com"
    fill_in "password", with: "testing123"
    fill_in "passwordConfirmation", with: "testing123"
    click_on "Signup"
    expect(page).to have_content("Please confirm your account")
  end
end
