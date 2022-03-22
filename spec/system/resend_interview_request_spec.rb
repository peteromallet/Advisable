# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Resending interview request", type: :system do
  it "resends the interview request" do
    next_workday = Time.zone.now.next_weekday
    interview = create(:interview, status: "Need More Time Options")
    authenticate_as interview.user
    visit "/interviews/#{interview.uid}"
    find("[aria-label='#{next_workday.strftime('%-d %b %Y, 10:00')}']").click
    find("[aria-label='#{next_workday.strftime('%-d %b %Y, 10:30')}']").click
    find("[aria-label='#{next_workday.strftime('%-d %b %Y, 11:00')}']").click
    find("[aria-label='#{next_workday.strftime('%-d %b %Y, 11:30')}']").click
    find("[aria-label='#{next_workday.strftime('%-d %b %Y, 12:00')}']").click
    find("[aria-label='#{next_workday.strftime('%-d %b %Y, 12:30')}']").click
    click_on "Update Availability"
    expect(page).to have_content("We have sent your updated availability")
  end
end
