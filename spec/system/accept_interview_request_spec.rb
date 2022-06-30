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
  let(:interview) { create(:interview, status: "Call Requested", accounts: [specialist.account, user.account], requested_by: user.account) }
  let(:interview2) { create(:interview, status: "Call Requested", accounts: [specialist.account, user.account], requested_by: specialist.account) }
  let(:next_work_day) { Time.current.next_weekday.beginning_of_day }

  before do
    allow_any_instance_of(Specialist).to receive(:sync_to_airtable)
    allow_any_instance_of(GoogleCalendar).to receive(:schedule_for_interview)
  end

  it "Accepts an interview request" do
    authenticate_as(interview.specialist)
    visit "/interview_request/#{interview.uid}"
    click_on user.availability[0].strftime("%A")
    find_all("a[class^=styles__Time]").first.click
    click_on "Confirm Call"
    expect(page).to have_content("has been scheduled!")
  end

  it "specialist suggests alternative times" do
    authenticate_as(specialist)
    visit "/interview_request/#{interview.uid}"
    click_on "Suggest alternative times"
    find("[aria-label='#{next_work_day.strftime('%-d %b %Y, 10:00')}']").click
    find("[aria-label='#{next_work_day.strftime('%-d %b %Y, 10:30')}']").click
    find("[aria-label='#{next_work_day.strftime('%-d %b %Y, 11:00')}']").click
    find("[aria-label='#{next_work_day.strftime('%-d %b %Y, 11:30')}']").click
    find("[aria-label='#{next_work_day.strftime('%-d %b %Y, 12:00')}']").click
    find("[aria-label='#{next_work_day.strftime('%-d %b %Y, 12:30')}']").click
    click_on("Continue")
    expect(page).to have_content(/unfortunately, none of these times work for me/i)
    click_button("Send Request")
    expect(page).to have_content("#{specialist.first_name} declined #{user.first_name}’s call request")
    expect(page).to have_content("#{specialist.name} requested a call")
    authenticate_as(user)
    visit "/messages"
    expect(page).to have_content("#{specialist.first_name} declined #{user.first_name}’s call request")
    expect(page).to have_content("#{specialist.name} requested a call")
  end

  it "user suggests alternative times" do
    authenticate_as(user)
    visit "/interview_request/#{interview2.uid}"
    click_on "Suggest alternative times"
    find("[aria-label='#{next_work_day.strftime('%-d %b %Y, 10:00')}']").click
    find("[aria-label='#{next_work_day.strftime('%-d %b %Y, 10:30')}']").click
    find("[aria-label='#{next_work_day.strftime('%-d %b %Y, 11:00')}']").click
    find("[aria-label='#{next_work_day.strftime('%-d %b %Y, 11:30')}']").click
    find("[aria-label='#{next_work_day.strftime('%-d %b %Y, 12:00')}']").click
    find("[aria-label='#{next_work_day.strftime('%-d %b %Y, 12:30')}']").click
    click_on("Continue")
    expect(page).to have_content(/unfortunately, none of these times work for me/i)
    click_button("Send Request")
    expect(page).to have_content("#{user.first_name} declined #{specialist.first_name}’s call request")
    expect(page).to have_content("#{user.name} requested a call")
    authenticate_as(specialist)
    visit "/messages"
    expect(page).to have_content("#{user.first_name} declined #{specialist.first_name}’s call request")
    expect(page).to have_content("#{user.name} requested a call")
  end
end
