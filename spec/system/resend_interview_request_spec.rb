require 'rails_helper'

describe 'Resending interview request' do
  before :each do
    allow_any_instance_of(Interview).to receive(:sync_to_airtable)
  end

  it 'resends the interview request' do
    monday = Date.parse('monday')
    delta = monday > Date.today ? 0 : 7
    next_monday = monday + delta

    interview = create(:interview)
    authenticate_as interview.application.project.user
    visit "/projects/#{interview.application.project.airtable_id}/interviews/#{
            interview.airtable_id
          }/availability"
    find("[aria-label='#{next_monday.strftime('%-d %b %Y, 10:00')}']").click
    find("[aria-label='#{next_monday.strftime('%-d %b %Y, 10:30')}']").click
    find("[aria-label='#{next_monday.strftime('%-d %b %Y, 11:00')}']").click
    find("[aria-label='#{next_monday.strftime('%-d %b %Y, 11:30')}']").click
    find("[aria-label='#{next_monday.strftime('%-d %b %Y, 12:00')}']").click
    find("[aria-label='#{next_monday.strftime('%-d %b %Y, 12:30')}']").click
    click_on 'Update Availability'
    expect(page).to have_content('Your updated availability has been sent')
  end
end
