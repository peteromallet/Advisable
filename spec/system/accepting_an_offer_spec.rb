require 'rails_helper'

describe 'Accepting an offer' do
  let(:offer) { create(:offer) }

  it 'Marks the booking as accepted' do
    airtable_booking = double("Airtable::Booking")
    expect(Airtable::Booking).to receive(:find).with(offer.airtable_id).and_return(airtable_booking)
    expect(airtable_booking).to receive(:[]=).with("Status", "Accepted")
    expect(airtable_booking).to receive(:save)

    visit "/offers/#{offer.airtable_id}"
    click_on 'Accept Offer'
    within '.ModalWindow' do
      click_on 'Accept Offer'
    end

    expect(page).to have_content('accepted this offer')
  end
end
