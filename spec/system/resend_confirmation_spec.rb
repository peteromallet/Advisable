require "rails_helper"

RSpec.describe "Resending confirmation request" do
  it "resends the confirmation email" do
    user = create(:user, confirmed_at: nil)
    authenticate_as user
    visit "/projects"
    click_on "Resend confirmation email"
    expect(page).to have_content("Confirmation email has been resent")
  end
end