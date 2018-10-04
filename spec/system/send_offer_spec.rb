require 'rails_helper'

describe 'Sending an offer' do
  let!(:project) { create(:project) }
  let!(:application) { create(:application, project: project) }

  before :each do
    booking_response = {
      id: "rec_123",
      fields: {
        "Rate": 5_000,
        "Rate Type": "Fixed",
        "Type": "Fixed",
        "Rate Limit": 0,
        "Status": "",
        "Application": ["recgf3QCkFVE6PAgt"],
        "Deliverables": "[]",
        "Decline Comment": "Testing",
        "Rejected Reason": ["recIHKW6K06caRmCn"],
        "Est. Project Start Date": "2018-11-01",
        "Est. Project End Date": "2018-11-30",
      }
    }

    application_response = {
      id: "rec_app",
      fields: {
        "Status": ""
      }
    }

    stub_request(:post, /airtable.com\/(.*)\/Bookings/).
      to_return(status: 200, body: booking_response.to_json, headers: {})

    stub_request(:get, /airtable.com\/v0\/(.*)\/Bookings/).
      to_return(status: 200, body: booking_response.to_json, headers: {})

    stub_request(:patch, /airtable.com\/v0\/(.*)\/Bookings/).
      to_return(status: 200, body: booking_response.to_json, headers: {})

    stub_request(:get, /airtable.com\/v0\/(.*)\/Applications/).
      to_return(status: 200, body: application_response.to_json, headers: {})
    
    stub_request(:patch, /airtable.com\/v0\/(.*)\/Applications/).
      to_return(status: 200, body: application_response.to_json, headers: {})
  end

  it "Creates an offer" do
    visit "/projects/#{project.airtable_id}/applications/#{application.airtable_id}/offer"
    fill_in 'startDate', with: 10.days.from_now.strftime("%d %B %Y")
    fill_in 'endDate', with: 40.days.from_now.strftime("%d %B %Y")
    fill_in 'rate', with: '100'
    select 'Hourly Rate', from: 'rateType'
    fill_in 'rateLimit', with: '2500'
    fill_in "deliverables[0]", with: "Testing 123"
    click_on 'Send Offer'
    expect(page).to have_content("An offer has been sent")
  end
end
