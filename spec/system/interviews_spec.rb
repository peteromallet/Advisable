require 'rails_helper'

RSpec.describe 'Interview flow' do
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

  before :each do
    allow_any_instance_of(Interview).to receive(:sync_to_airtable)
    allow_any_instance_of(Specialist).to receive(:sync_to_airtable)
  end

  it 'allows the client to request to reschedule a call' do
    interview = create(:interview, status: "Call Scheduled", starts_at: 2.days.from_now, user: user)
    authenticate_as interview.user
    visit "/interviews/#{interview.airtable_id}"
    click_on "Request To Reschedule"
    date = DateTime.now.next_weekday.beginning_of_day
    find("[aria-label='#{date.strftime('%-d %b %Y, 10:00')}']").click
    find("[aria-label='#{date.strftime('%-d %b %Y, 10:30')}']").click
    find("[aria-label='#{date.strftime('%-d %b %Y, 11:00')}']").click
    find("[aria-label='#{date.strftime('%-d %b %Y, 11:30')}']").click
    find("[aria-label='#{date.strftime('%-d %b %Y, 12:00')}']").click
    find("[aria-label='#{date.strftime('%-d %b %Y, 12:30')}']").click
    click_on "Request To Reschedule"
    expect(page).to have_content("You have requested to reschedule your call")
  end

  context 'when the client has requested to reschedule' do
    it 'the specialist can schedule the interview' do
      interview = create(:interview, status: "Client Requested Reschedule", starts_at: 2.days.from_now, user: user)
      authenticate_as interview.specialist
      visit "/interviews/#{interview.uid}"
      click_on user.availability[0].strftime("%A")
      find_all("a[class^=styles__Time]").first.click
      fill_in "phoneNumber", with: "0861234567"
      click_on "Confirm Call"
      expect(page).to have_content("has been scheduled!")
    end
  end

  it 'allows the specialist to request to reschedule a call' do
    interview = create(:interview, status: "Call Scheduled", starts_at: 2.days.from_now, user: user)
    authenticate_as interview.specialist
    visit "/interviews/#{interview.airtable_id}"
    click_on "Request To Reschedule"
    fill_in "note", with: "No can do"
    click_on "Reschedule"
    expect(page).to have_content("You have requested to reschedule your call")
  end

  context 'when specialist has requested to reschedule' do
    it 'the client can update their availability' do
      interview = create(:interview, status: "Specialist Requested Reschedule", starts_at: 2.days.from_now, user: user)
      authenticate_as interview.user
      visit "/interviews/#{interview.airtable_id}"
      date = DateTime.now.next_weekday.beginning_of_day
      find("[aria-label='#{date.strftime('%-d %b %Y, 10:00')}']").click
      find("[aria-label='#{date.strftime('%-d %b %Y, 10:30')}']").click
      find("[aria-label='#{date.strftime('%-d %b %Y, 11:00')}']").click
      find("[aria-label='#{date.strftime('%-d %b %Y, 11:30')}']").click
      find("[aria-label='#{date.strftime('%-d %b %Y, 12:00')}']").click
      find("[aria-label='#{date.strftime('%-d %b %Y, 12:30')}']").click
      click_on "Update Availability"
      expect(page).to have_content("We have sent your updated availability")
    end
  end

  context 'when more time options have been added' do
    it 'allows the specialist can schedule the call' do
      interview = create(:interview, status: "More Time Options Added", starts_at: 2.days.from_now, user: user)
      authenticate_as interview.specialist
      visit "/interviews/#{interview.uid}"
      click_on user.availability[0].strftime("%A")
      find_all("a[class^=styles__Time]").first.click
      fill_in "phoneNumber", with: "0861234567"
      click_on "Confirm Call"
      expect(page).to have_content("has been scheduled!")
    end
  end
end
