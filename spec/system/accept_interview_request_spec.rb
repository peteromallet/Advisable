# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Accept interview request", type: :system do
  let(:account) do
    create(:account, {
      availability: [
        2.days.from_now.change({hour: 10, min: 0, secs: 0}),
        2.days.from_now.change({hour: 10, min: 30, secs: 0}),
        2.days.from_now.change({hour: 11, min: 0, secs: 0}),
        2.days.from_now.change({hour: 11, min: 30, secs: 0})
      ]
    })
  end
  let(:user) { create(:user, account:) }
  let(:specialist) { create(:specialist) }
  let(:interview) { create(:interview, status: "Call Requested", accounts: [specialist.account, user.account]) }

  it "Accepts an interview request" do
    allow_any_instance_of(Specialist).to receive(:sync_to_airtable)
    allow_any_instance_of(GoogleCalendar).to receive(:schedule_for_interview)

    authenticate_as(interview.specialist)
    visit "/interview_request/#{interview.uid}"
    click_on user.availability[0].strftime("%A")
    find_all("a[class^=styles__Time]").first.click
    click_on "Confirm Call"
    expect(page).to have_content("has been scheduled!")
  end
end
