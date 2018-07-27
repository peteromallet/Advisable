require 'rails_helper'

describe 'Rejecting an application' do
  let!(:project) { create(:project) }
  let!(:application) { create(:application, project: project) }
  let!(:reason) { create(:application_rejection_reason, reason: 'Too Expensive') }

  it "sets the applicaton status to Application Rejected" do
    airtableApplication = double("Airtable::Application")
    allow(airtableApplication).to receive(:[]=)
    allow(airtableApplication).to receive(:save)
    expect(Airtable::Application).to receive(:find).with(application.airtable_id)
      .and_return(airtableApplication)
    visit "/projects/#{project.airtable_id}"
    expect(page).to have_content(application.introduction)
    click_on 'Reject'
    select 'Too Expensive', from: "reason"
    within '.ModalWindow' do
      click_on 'Reject'
    end
    expect(page).to_not have_content(application.introduction)
    expect(application.reload.status).to eq('Application Rejected')
    expect(application.reload.rejection_reason).to eq(reason)
  end
end
