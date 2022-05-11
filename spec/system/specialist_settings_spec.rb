# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Specialist settings", type: :system do
  before do
    allow_any_instance_of(Specialist).to receive(:sync_to_airtable)
  end

  it "allows specialist to change their password" do
    account = create(:account, password: "testing123")
    specialist = create(:specialist, account:)
    authenticate_as specialist
    visit "/settings/password"
    fill_in "currentPassword", with: "testing123"
    fill_in "password", with: "changed123"
    fill_in "passwordConfirmation", with: "changed123"
    click_on "Update password"
    expect(page).to have_content("password has been updated")
    expect(account.authenticate("changed123")).to be_truthy
  end

  it "allows specialist to change their email" do
    account = create(:account, password: "testing123")
    specialist = create(:specialist, account:)
    authenticate_as specialist
    visit "/settings/account"
    fill_in "email", with: "update@test.com", fill_options: {clear: :backspace}
    click_on "Update settings"
    expect(page).to have_content("Your account has been updated")
    expect(specialist.reload.account.email).to eq("update@test.com")
  end

  it "specialist can set their availability" do
    specialist = create(:specialist, unavailable_until: nil)
    authenticate_as(specialist)
    visit("/settings/availability")
    click_on("Set Available Date")
    click_on("Next Month")
    first(".DayPicker-Day[aria-disabled='false']").click
    expect(page).to have_content(/You have currently set yourself as unavailable/i)
    expect(specialist.reload.unavailable_until).to be_truthy
    click_on("Set Available")
    expect(page).not_to have_content(/You have currently set yourself as unavailable/i)
    expect(specialist.reload.unavailable_until).to be_nil
  end
end
