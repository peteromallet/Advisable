# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Update availability", type: :system do
  let(:user) { create(:user) }

  it "sets the clients availability" do
    authenticate_as(user)
    monday = Date.parse("monday")
    delta = monday > Time.zone.today ? 0 : 7
    next_monday = monday + delta

    visit "/clients/#{user.uid}/availability"
    find("[aria-label='#{next_monday.strftime('%-d %b %Y, 10:00')}']").click
    find("[aria-label='#{next_monday.strftime('%-d %b %Y, 10:30')}']").click
    find("[aria-label='#{next_monday.strftime('%-d %b %Y, 11:00')}']").click
    find("[aria-label='#{next_monday.strftime('%-d %b %Y, 11:30')}']").click
    find("[aria-label='#{next_monday.strftime('%-d %b %Y, 12:00')}']").click
    find("[aria-label='#{next_monday.strftime('%-d %b %Y, 12:30')}']").click

    click_on "Update Availability"

    expect(page).to have_content("Your availability has been updated")
  end
end
