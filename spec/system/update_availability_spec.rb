require 'rails_helper'

RSpec.describe 'Update availability' do
  let(:user) { create(:user) }

  it 'sets the clients availability' do
    monday = Date.parse('monday')
    delta = monday > Date.today ? 0 : 7
    next_monday = monday + delta

    visit "/clients/#{user.airtable_id}/availability"
    find("[aria-label='#{next_monday.strftime('%-d %b %Y, 10:00')}']").click
    find("[aria-label='#{next_monday.strftime('%-d %b %Y, 10:30')}']").click
    find("[aria-label='#{next_monday.strftime('%-d %b %Y, 11:00')}']").click
    find("[aria-label='#{next_monday.strftime('%-d %b %Y, 11:30')}']").click
    find("[aria-label='#{next_monday.strftime('%-d %b %Y, 12:00')}']").click
    find("[aria-label='#{next_monday.strftime('%-d %b %Y, 12:30')}']").click

    click_on 'Update Availability'

    expect(page).to have_content('Your availability has been updated')
  end
end
