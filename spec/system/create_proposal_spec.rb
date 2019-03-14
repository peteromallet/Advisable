require 'rails_helper'

describe 'Creating a proposal' do
  let!(:project) { create(:project) }
  let!(:application) { create(:application, project: project) }

  it 'notifies the user' do
    start_date = 10.days.from_now
    end_date = start_date + 4.months

    airtable_booking_record = double('Airtable::Booking', id: 'booking_123')
    expect(airtable_booking_record).to receive(:create)
    expect(Airtable::Booking).to receive(:new).and_return(airtable_booking_record)

    airtable_application_record = double('Airtable::Application')
    expect(airtable_application_record).to receive(:[]=).with('Application Status', 'Proposed').at_least(:once)
    expect(airtable_application_record).to receive(:save)
    expect(Airtable::Application).to receive(:find).and_return(airtable_application_record)

    visit "/applications/#{application.airtable_id}/proposal"

    choose('Recurring', allow_label_click: true)
    fill_in 'startDate', with: start_date.strftime('%d %B %Y')
    select '4 Months', from: 'duration'
    fill_in 'rate', with: '100'
    select 'Fixed', from: 'rateType'
    fill_in 'deliverables[0]', with: 'Testing 123'
    fill_in 'proposalComment', with: 'Hey there'
    click_on 'Send Proposal'

    expect(page).to have_content('proposal has been sent')

    expect(application.reload.status).to eq('Proposed')
  end
end
