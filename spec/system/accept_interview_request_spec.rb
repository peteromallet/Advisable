require 'rails_helper'

RSpec.describe 'Accept interview request' do
  let(:user) {
    create(:user, {
      availability: [
        2.days.from_now.change({ hour: 10, min: 0, secs: 0 }),
        2.days.from_now.change({ hour: 10, min: 30, secs: 0 }),
        2.days.from_now.change({ hour: 11, min: 0, secs: 0 }),
        2.days.from_now.change({ hour: 11, min: 30, secs: 0 }),
      ]
    })
  }
  let(:interview) {
    create(:interview, status: "Call Requested", user: user)
  }

  it 'Accepts an interview request' do
    allow_any_instance_of(Interview).to receive(:sync_to_airtable)
    allow_any_instance_of(Specialist).to receive(:sync_to_airtable)

    visit "/interview_request/#{interview.airtable_id}"
    click_on user.availability[0].strftime("%A")
    find_all("a[class^=styles__Time]").first.click
    fill_in "phoneNumber", with: "0861234567"
    click_on "Confirm Call"
    expect(page).to have_content("has been scheduled!")
  end
end
