require 'rails_helper'

RSpec.describe "Freelancer profile" do
  describe "introduction" do
    it "updates their introduction" do
      specialist = create(:specialist)
      allow_any_instance_of(Specialist).to receive(:sync_to_airtable)
      authenticate_as(specialist)
      visit "/profile"
      fill_in "bio", with: "This is the bio, testing 123"
      click_on "Save Changes"
      expect(page).to have_content("Your profile has been updated")
    end
  end
end