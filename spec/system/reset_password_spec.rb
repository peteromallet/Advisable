# frozen_string_literal: true

require "system_helper"

RSpec.describe "Reset password", type: :system do
  it "User can request password reset" do
    user = create(:user)
    visit "/reset_password"
    fill_in "email", with: user.account.email
    click_on "Send password reset"
    expect(page).to have_content("Instructions sent")
  end

  it "User can reset their password" do
    token = Token.new
    account = create(:account, reset_digest: Token.digest(token), reset_sent_at: 1.hour.ago)
    visit "/reset_password/#{token}?email=#{account.email}"
    fill_in "password", with: "testing123"
    fill_in "passwordConfirmation", with: "testing123"
    click_on "Reset Password"
    expect(page).to have_content("Your password has been updated")
  end
end
