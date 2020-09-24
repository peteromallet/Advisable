require 'rails_helper'

RSpec.describe 'Resending interview request' do
  before :each do
    allow_any_instance_of(Interview).to receive(:sync_to_airtable)
  end

  it 'resends the interview request' do
    next_workday = DateTime.now.next_weekday
    interview = create(:interview, status: "Need More Time Options")
    authenticate_as interview.application.project.user
    visit "/projects/#{interview.application.project.airtable_id}/interviews/#{
            interview.airtable_id
          }/availability"
    find("[aria-label='#{next_workday.strftime('%-d %b %Y, 10:00')}']").click
    find("[aria-label='#{next_workday.strftime('%-d %b %Y, 10:30')}']").click
    find("[aria-label='#{next_workday.strftime('%-d %b %Y, 11:00')}']").click
    find("[aria-label='#{next_workday.strftime('%-d %b %Y, 11:30')}']").click
    find("[aria-label='#{next_workday.strftime('%-d %b %Y, 12:00')}']").click
    find("[aria-label='#{next_workday.strftime('%-d %b %Y, 12:30')}']").click
    click_on 'Update Availability'
    expect(page).to have_content('We have sent your updated availability')
  end
end
