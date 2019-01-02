require 'rails_helper'

describe 'Rejecting an application' do
  let!(:proposal) { create(:booking, status: 'Proposed') }
  let!(:reason) { create(:application_rejection_reason, reason: 'Too Expensive') }

  it "sets the applicaton status to Application Rejected" do
    airtableApplication = double("Airtable::Application")
    expect(airtableApplication).to receive(:[]=).with("Application Status", "Application Rejected")
    expect(airtableApplication).to receive(:[]=).with("Rejected Reason", [reason.airtable_id])
    expect(airtableApplication).to receive(:save)
    expect(Airtable::Application).to receive(:find).with(proposal.application.airtable_id)
      .and_return(airtableApplication)

    airtableBooking = double("Airtable::Booking")
    expect(airtableBooking).to receive(:[]=).with("Client Decline Comment", "Testing 123")
    expect(airtableBooking).to receive(:[]=).with("Status", "Declined")
    expect(airtableBooking).to receive(:save)
    expect(Airtable::Booking).to receive(:find).with(proposal.airtable_id)
      .and_return(airtableBooking)

    authenticate_as proposal.application.project.user
    visit "/projects/#{proposal.application.project.airtable_id}/proposals/#{proposal.airtable_id}"
    click_on 'Reject Applicant'
    select 'Too Expensive', from: "reason"
    fill_in "comment", with: "Testing 123"
    within '.ModalWindow' do
      click_on 'Reject Applicant'
    end
    expect(page).to have_content('application has been rejected')
  end
end
