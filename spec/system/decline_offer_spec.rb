require 'rails_helper'

describe 'Decline an offer' do
  let(:offer) { create(:offer) }
  let(:reason) { create(:booking_rejection_reason) }

  it 'sets the booking status to declined' do
    airtable_booking = double("Airtable::Booking")
    expect(Airtable::Booking).to receive(:find).with(offer.airtable_id).and_return(airtable_booking)
    expect(airtable_booking).to receive(:[]=).with("Status", "Declined")
    expect(airtable_booking).to receive(:[]=).with("Rejected Reason", [reason.airtable_id])
    expect(airtable_booking).to receive(:[]=).with("Decline Comment", "comment")
    expect(airtable_booking).to receive(:save)

    visit "/offers/#{offer.airtable_id}"
    click_on 'Decline'
    within '.ModalWindow' do
        select 'Not Enough Experience', from: 'reason'
        fill_in 'declineComment', with: 'comment'
        click_on 'Decline Offer'
    end

    expect(page).to have_content('declined this offer')
  end
end
