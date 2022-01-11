# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Consultations", type: :system do
  let(:specialist) { create(:specialist) }
  let(:user) do
    create(
      :user,
      availability: [
        2.days.from_now.change({hour: 10, min: 0, secs: 0}),
        2.days.from_now.change({hour: 10, min: 30, secs: 0}),
        2.days.from_now.change({hour: 11, min: 0, secs: 0}),
        2.days.from_now.change({hour: 11, min: 30, secs: 0})
      ]
    )
  end
  let(:conversation) { Conversation.by_accounts([specialist.account, user.account]) }
  let(:consultation) { create(:consultation, user:, specialist:, status: "Request Completed") }
  let(:message) do
    conversation.new_message!(
      user.account,
      "The consultation request message",
      kind: "ConsultationRequest",
      consultation:
    )
  end

  before do
    allow_any_instance_of(Project).to receive(:sync_to_airtable)
    allow_any_instance_of(GoogleCalendar).to receive(:schedule_for_interview)
  end

  it "specialist can accept a consultation request" do
    authenticate_as(specialist)
    visit("/messages/#{conversation.uid}")
    expect(page).to have_content(message.content)
    click_on("Respond")
    click_on("View availability")
    click_on(user.availability[0].strftime("%A"))
    find_all("a[class^=styles__Time]").first.click
    click_on("Confirm Call")
    expect(page).to have_content("scheduled a call for #{user.availability[0].strftime("%d %B %Y at %H:%M")}")
  end

  it "specialist can decline a consultation request" do
    authenticate_as(specialist)
    visit("/messages/#{conversation.uid}")
    expect(page).to have_content(message.content)
    click_on("Respond")
    click_on("Decline")
    fill_in("reason", with: "Not interested")
    click_on("Decline request")
    expect(page).to have_content("#{specialist.account.first_name} declined the call request")
    expect(page).to have_content("Not interested")
  end
end
