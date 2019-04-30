require 'rails_helper'

describe 'Rejecting an application' do
  let(:application) { create(:application, status: 'Proposed') }
  
  before :each do
    allow_any_instance_of(Application).to receive(:sync_to_airtable)
  end

  it "sets the applicaton status to Application Rejected" do
    authenticate_as application.project.user
    visit "/projects/#{application.project.airtable_id}/applications/#{application.airtable_id}/proposal"
    click_on 'Reject application'
    select 'Too Expensive', from: "reason"
    fill_in "comment", with: "Testing 123"
    within '.ModalWindow' do
      click_on 'Reject Applicant'
    end
    expect(page).to have_content('application has been rejected')
  end
end
