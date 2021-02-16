# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Creating a freelancer account", type: :system do
  it "shows the user the account confirmation flow" do
    airtable = double(Airtable::Specialist) # rubocop:disable RSpec/VerifiedDoubles
    allow(Airtable::Specialist).to receive(:find).and_return(airtable)
    allow(airtable).to receive(:push)

    specialist = create(:specialist, account: create(:account, password: nil, confirmed_at: nil))
    visit "/signup/#{specialist.uid}"
    fill_in "email", with: "#{Time.now.to_i}@test.com"
    fill_in "password", with: "testing123"
    fill_in "passwordConfirmation", with: "testing123"
    click_on "Signup"
    expect(page).to have_content("Please confirm your account")
  end
end
