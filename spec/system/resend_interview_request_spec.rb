require 'rails_helper'

describe 'Resending interview request' do
  before :each do
    allow_any_instance_of(Interview).to receive(:sync_to_airtable)
  end

  it 'resends the interview request' do
    interview = create(:interview)
    authenticate_as interview.application.project.user
    visit "/projects/#{interview.application.project.airtable_id}/interviews/#{
            interview.airtable_id
          }/availability"
    page.all('div[class^=styles__TimeCell]')[10].click
    page.all('div[class^=styles__TimeCell]')[34].click
    page.all('div[class^=styles__TimeCell]')[58].click
    page.all('div[class^=styles__TimeCell]')[82].click
    page.all('div[class^=styles__TimeCell]')[94].click
    click_on 'Update Availability'
    expect(page).to have_content('Your updated availability has been sent')
  end
end
