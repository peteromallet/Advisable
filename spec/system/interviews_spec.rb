# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Interviews", type: :system do
  let(:account) do
    create(:account, availability: [
             2.days.from_now.change({hour: 10, min: 0, secs: 0}),
             2.days.from_now.change({hour: 10, min: 30, secs: 0}),
             2.days.from_now.change({hour: 11, min: 0, secs: 0}),
             2.days.from_now.change({hour: 11, min: 30, secs: 0})
           ])
  end
  let(:next_work_day) { Time.current.next_weekday.beginning_of_day }
  let(:user) { create(:user, account:) }
  let(:specialist) { create(:specialist, account: create(:account)) }

  before do
    allow_any_instance_of(Specialist).to receive(:sync_to_airtable)
    allow_any_instance_of(GoogleCalendar).to receive(:schedule_for_interview)
  end

  it "specialist can accept an interview request via messages" do
    interview = create(:interview, accounts: [specialist.account, user.account], status: "Call Requested")
    conversation = Conversation.by_accounts(interview.user, interview.specialist)
    message = conversation.new_message!(
      author: user.account,
      content: "Interview request message",
      kind: "InterviewRequest",
      interview:
    )

    authenticate_as(interview.specialist)
    visit("/messages/#{conversation.uid}")
    expect(page).to have_content(message.content)
    click_on("Respond")
    click_link("View availability")
    click_on(user.availability[0].strftime("%A"))
    find_all("a[class^=styles__Time]").first.click
    click_on("Confirm Call")
    expect(page).to have_content("Call Scheduled")
    expect(page).to have_content(user.availability[0].getlocal.strftime("%H:%M"))
  end

  it "specialist can decline an interview request via messages" do
    interview = create(:interview, accounts: [specialist.account, user.account], status: "Call Requested")
    conversation = Conversation.by_accounts(interview.user, interview.specialist)
    message = conversation.new_message!(
      author: user.account,
      content: "Interview request message",
      kind: "InterviewRequest",
      interview:
    )

    authenticate_as(interview.specialist)
    visit("/messages/#{conversation.uid}")
    expect(page).to have_content(message.content)
    click_on("Respond")
    click_on("Decline")
    fill_in("reason", with: "Not interested")
    click_on("Decline request")
    expect(page).to have_content(/declined .* call request/i)
  end

  it "excludes previously scheduled call slots from availability list" do
    times = [{hour: 10, min: 0}, {hour: 10, min: 30}, {hour: 11, min: 0}, {hour: 11, min: 30}, {hour: 12, min: 0}, {hour: 12, min: 30}]
    availability = times.map { |t| next_work_day.change(hour: t[:hour], min: t[:min]) }
    specialist.account.update(availability:)
    create(:interview, accounts: [specialist.account, user.account], status: "Call Scheduled", starts_at: next_work_day.change(hour: 10, min: 30))
    requested_call = create(:interview, accounts: [specialist.account, user.account], status: "Call Requested", requested_by: specialist.account)
    authenticate_as(user)
    with_timezone("UTC") do
      visit("/interview_request/#{requested_call.uid}")
      click_on(next_work_day.strftime("%-d %b %Y"))
      expect(page).to have_content("Select a time for your call")
      expect(page).not_to have_content("10:30 AM - 11:00 AM")
    end
  end

  context "when the client has requested to reschedule" do
    it "the specialist can schedule the interview" do
      interview = create(:interview, status: "Client Requested Reschedule", starts_at: 2.days.from_now, accounts: [specialist.account, user.account], requested_by: user.account)
      authenticate_as interview.specialist
      visit "/interviews/#{interview.uid}"
      click_on user.availability[0].strftime("%A")
      find_all("a[class^=styles__Time]").first.click
      click_on "Confirm Call"
      expect(page).to have_content("has been scheduled!")
    end
  end

  context "when specialist has requested to reschedule" do
    it "the client can update their availability" do
      interview = create(:interview, accounts: [specialist.account, user.account], status: "Specialist Requested Reschedule")
      authenticate_as interview.user
      visit "/interviews/#{interview.uid}"
      find("[aria-label='#{next_work_day.strftime('%-d %b %Y, 10:00')}']").click
      find("[aria-label='#{next_work_day.strftime('%-d %b %Y, 10:30')}']").click
      find("[aria-label='#{next_work_day.strftime('%-d %b %Y, 11:00')}']").click
      find("[aria-label='#{next_work_day.strftime('%-d %b %Y, 11:30')}']").click
      find("[aria-label='#{next_work_day.strftime('%-d %b %Y, 12:00')}']").click
      find("[aria-label='#{next_work_day.strftime('%-d %b %Y, 12:30')}']").click
      click_on "Update Availability"
      expect(page).to have_content(/updated availability/i)
    end
  end

  it "allows the user to invite a member of their team" do
    interview = create(:interview, accounts: [specialist.account, user.account], status: "Call Requested")
    create(:user, account: create(:account, first_name: "Thomas"), company: user.company)
    authenticate_as(user)
    visit "/interviews/#{interview.uid}"
    click_on("Invite Others")
    click_on("Share with Thomas")
    expect(page).to have_content("Invite sent")
  end

  it "allows the user to invite a new member of their team" do
    allow_any_instance_of(User).to receive(:sync_to_airtable)
    interview = create(:interview, accounts: [specialist.account, user.account], status: "Call Requested")
    authenticate_as(user)
    visit "/interviews/#{interview.uid}"
    click_on("Invite Others")
    fill_in("name", with: "Jim Halpert")
    fill_in("email", with: "jim@dundermifflin.com")
    click_on("Invite")
    expect(page).to have_content("Invite sent")
  end

  it "allows the client to reschedule a call" do
    interview = create(:interview, accounts: [specialist.account, user.account], status: "Call Scheduled", requested_by: specialist.account)
    authenticate_as(user)
    visit "/interviews/#{interview.uid}"
    click_on "Reschedule"
    expect(page).to have_content("Reschedule")
    find("[aria-label='Date picker']").click
    find("[aria-label='#{next_work_day.strftime('%a %b %d %Y')}']").click
    select("01", from: "hour")
    select("30", from: "minute")
    fill_in("comment", with: "New times are better")
    within("*[role='dialog']") do
      click_button("Reschedule")
    end
    expect(page).to have_content("Your upcoming call was rescheduled to #{next_work_day.strftime('%d %B %Y')} at 01:30AM")
    expect(page).to have_content(user.name)
    expect(page).to have_content("New times are better")
  end

  it "allows the requestor to reschedule a call" do
    interview = create(:interview, accounts: [specialist.account, user.account], status: "Call Scheduled", requested_by: specialist.account)
    authenticate_as(specialist)
    visit "/interviews/#{interview.uid}"
    click_on "Reschedule"
    expect(page).to have_content("Reschedule")
    find("[aria-label='Date picker']").click
    find("[aria-label='#{next_work_day.strftime('%a %b %d %Y')}']").click
    select("01", from: "hour")
    select("30", from: "minute")
    fill_in("comment", with: "New times are better")
    within("*[role='dialog']") do
      click_button("Reschedule")
    end
    expect(page).to have_content("Your upcoming call was rescheduled to #{next_work_day.strftime('%d %B %Y')} at 01:30AM")
    expect(page).to have_content(specialist.name)
    expect(page).to have_content("New times are better")
  end
end
