# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Resending confirmation request" do
  it "resends the confirmation email" do
    user = create(:user, account: create(:account, confirmed_at: nil, completed_tutorials: ["onboarding"]))
    authenticate_as user
    visit "/explore"
    click_on "Resend confirmation email"
    expect(page).to have_content("Confirmation email has been resent")
  end
end
