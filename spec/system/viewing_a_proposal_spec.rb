require 'rails_helper'

describe 'Viewing a proposal' do
  let!(:proposal) { create(:booking, status: 'Proposed', type: 'Fixed', deliverables: ['Test']) }

  it 'Sends the proposal back to the specialist as an offer' do
    airtable_booking_record = double('Airtable::Booking')
    expect(airtable_booking_record).to receive(:[]=).with('Status', 'Offered').at_least(:once)
    expect(airtable_booking_record).to receive(:[]=).at_least(:once)
    expect(airtable_booking_record).to receive(:save)
    expect(Airtable::Booking).to receive(:find).and_return(airtable_booking_record)

    airtable_application_reocrd = double('Airtable::Application')
    expect(airtable_application_reocrd).to receive(:[]=).with('Application Status', 'Offered').at_least(:once)
    expect(airtable_application_reocrd).to receive(:save)
    expect(Airtable::Application).to receive(:find).and_return(airtable_application_reocrd)

    project = proposal.application.project

    visit "/projects/#{project.airtable_id}/proposals/#{proposal.airtable_id}"

    fill_in 'rate', with: ''
    fill_in 'rate', with: '5000'
    click_on 'Send Offer'

    expect(page).to have_content('offer has been sent')

    expect(proposal.reload.rate).to eq(5000.0)
    expect(proposal.status).to eq('Offered')
  end
end
