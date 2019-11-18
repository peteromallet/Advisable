require 'rails_helper'

describe 'Rejecting an application' do
  let!(:project) { create(:project) }
  let!(:application) { create(:application, project: project) }

  before :each do
    allow_any_instance_of(Application).to receive(:sync_to_airtable)
  end

  it "sets the applicaton status to Application Rejected" do
    authenticate_as project.user
    visit "/projects/#{project.airtable_id}"
    click_on 'Provide Feedback'
    select 'I want someone cheaper', from: "rejectionReason"
    fill_in 'rejectionReasonComment', with: 'We are looking for someone who charges < €80 an hour'
    click_on 'Reject Applicant'
    expect(page).to_not have_content(application.introduction)
    expect(application.reload.status).to eq('Application Rejected')
    expect(application.reload.rejection_reason).to eq('I want someone cheaper')
  end
end
