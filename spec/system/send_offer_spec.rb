require 'rails_helper'

describe 'Sending an offer' do
  let!(:project) { create(:project) }
  let!(:application) { create(:application, project: project) }

  it 'Creates an offer' do
    start_date = 10.days.from_now
    end_date = 40.days.from_now

    payload = {
      'fields' => {
        'Type' => 'Fixed',
        'Rate' => 100.0,
        'Rate Type' => 'Per Hour',
        'Rate Limit' => 2500.0,
        'Duration' => nil,
        'Status' => 'Offered',
        'Est. Project Start Date' => start_date.strftime('%Y-%m-%d'),
        'Est. Project End Date' => end_date.strftime('%Y-%m-%d'),
        'Deliverables' => '["Testing 123"]',
        'Application' => [application.airtable_id]
      }
    }

    stub_request(:post, /airtable.*Bookings/).with(body: payload.to_json)
      .and_return(body: payload.merge(id: 'booking_123').to_json)

    stub_request(:get, /airtable.*Applications/).and_return(body: {
      id: application.airtable_id,
      fields: {
        "Application Status": 'Application Accepted'
      }
    }.to_json)

    stub_request(:patch, /airtable.*Applications/).with(body: {
      fields: {
        "Application Status": 'Offered'
      }
    }.to_json).to_return(body: {
      id: application.airtable_id,
      fields: {
        "Application Status": 'Offered'
      }
    }.to_json)

    authenticate_as project.user
    visit "/projects/#{project.airtable_id}/applications/#{application.airtable_id}/offer"
    fill_in 'startDate', with: start_date.strftime('%d %B %Y')
    fill_in 'endDate', with: end_date.strftime('%d %B %Y')
    fill_in 'rate', with: '100'
    select 'Hourly Rate', from: 'rateType'
    fill_in 'rateLimit', with: '2500'
    fill_in 'deliverables[0]', with: 'Testing 123'
    click_on 'Send Offer'

    expect(page).to have_content('An offer has been sent')
  end
end
