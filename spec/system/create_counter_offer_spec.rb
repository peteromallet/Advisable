require 'rails_helper'

describe 'Create counter offer' do
  let!(:offer) { create(:booking, status: 'Offered', type: 'Fixed', deliverables: ['Test']) }

  it 'Sends the offer back to the specialist as a counter offer' do
    airtable_booking_record = double('Airtable::Booking', id: 'booking_123')
    expect(airtable_booking_record).to receive(:create)
    expect(Airtable::Booking).to receive(:new).and_return(airtable_booking_record)

    airtable_application_reocrd = double('Airtable::Application')
    expect(airtable_application_reocrd).to receive(:[]=).with('Application Status', 'Offered').at_least(:once)
    expect(airtable_application_reocrd).to receive(:save)
    expect(Airtable::Application).to receive(:find).and_return(airtable_application_reocrd)

    project = offer.application.project

    authenticate_as project.client.users.first
    visit "/projects/#{project.airtable_id}/offers/#{offer.airtable_id}"

    fill_in 'rate', with: ''
    fill_in 'rate', with: '5000'
    click_on 'Send Offer'

    expect(page).to have_content('offer has been sent')
  end
end
