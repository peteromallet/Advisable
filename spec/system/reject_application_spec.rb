require 'rails_helper'

describe 'Rejecting an application' do
  let!(:project) { create(:project) }
  let!(:application) { create(:application, project: project) }

  it "sets the applicaton status to Application Rejected" do
    airtableApplication = double("Airtable::Application")
    allow(airtableApplication).to receive(:[]=)
    allow(airtableApplication).to receive(:save)
    expect(Airtable::Application).to receive(:find).with(application.airtable_id)
      .and_return(airtableApplication)

    visit "/projects/#{project.airtable_id}"
    click_on 'Provide Feedback'
    within '.ModalWindow' do
      select 'I want someone cheaper', from: "rejectionReason"
      fill_in 'rejectionReasonComment', with: 'We are looking for someone who charges < €80 an hour'
      click_on 'Reject'
    end
    expect(page).to_not have_content(application.introduction)
    expect(application.reload.status).to eq('Application Rejected')
    expect(application.reload.rejection_reason).to eq('I want someone cheaper')
  end
end
