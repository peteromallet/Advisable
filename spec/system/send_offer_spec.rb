require 'rails_helper'

describe 'Sending an offer' do
  let!(:project) { create(:project) }
  let!(:application) { create(:application, project: project) }

  it "Creates an offer" do
    airtable_application = double("Airtable::Application", id: '123')
    expect(airtable_application).to receive(:[]=).with("Application Status", "Offered")
    expect(airtable_application).to receive(:save)
    expect(Airtable::Application).to receive(:find).with(application.airtable_id)
      .and_return(airtable_application)

    airtable_booking = double("Airtable::Booking", id: '123')
    expect(Airtable::Booking).to receive(:new).and_return(airtable_booking)
    expect(airtable_booking).to receive(:create)

    visit "/projects/#{project.airtable_id}/applications/#{application.airtable_id}/offer"
    fill_in 'startDate', with: 10.days.from_now.strftime("%d %B %Y")
    fill_in 'endDate', with: 40.days.from_now.strftime("%d %B %Y")
    fill_in 'rate', with: '100'
    select 'Hourly Rate', from: 'rateType'
    fill_in 'rateLimit', with: '2500'
    click_on 'Send Offer'
    expect(page).to have_content("An offer has been sent")
  end
end
