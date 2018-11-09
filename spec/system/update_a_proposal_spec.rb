require 'rails_helper'

describe 'Updating a proposal' do
  let!(:proposal) { create(:booking, status: 'Proposed', type: 'Fixed', deliverables: ['Test']) }

  it 'updates the proposal record' do
    end_date = 40.days.from_now

    airtable_booking_record = double('Airtable::Booking')
    expect(airtable_booking_record).to receive(:[]=).at_least(:once)
    expect(airtable_booking_record).to receive(:save)
    expect(Airtable::Booking).to receive(:find).and_return(airtable_booking_record)

    visit "/applications/#{proposal.application.airtable_id}/proposal/#{proposal.airtable_id}"
    fill_in 'endDate', with: ""
    fill_in 'endDate', with: end_date.strftime('%d %B %Y')
    click_on 'Update Proposal'
    expect(page).to have_content('proposal has been updated')
  end
end
