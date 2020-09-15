require "rails_helper"

RSpec.describe "Request password reset" do
  it "tells the user to check their inbox" do
    user = create(:user)
    visit "/reset_password"
    fill_in "email", with: user.email
    click_on "Send password reset"
    expect(page).to have_content("Instructions sent")
  end
end