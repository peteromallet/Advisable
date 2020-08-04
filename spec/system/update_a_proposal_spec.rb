require 'rails_helper'

describe 'Updating a proposal' do
  let(:application) { create(:application, status: 'Proposed') }

  before :each do
    allow_any_instance_of(Task).to receive(:sync_to_airtable)
    allow_any_instance_of(Application).to receive(:sync_to_airtable)
    allow_any_instance_of(Project).to receive(:sync_to_airtable)
  end

  it 'updates the proposal record' do
    authenticate_as application.specialist
    visit "/applications/#{application.airtable_id}/proposal"
    fill_in 'rate', with: '55'
    click_on 'Continue'
    find(:label, text: 'Flexible - Monthly Limit').click
    fill_in 'monthlyLimit', with: '65'
    find(:label, text: 'I agree to follow these payment terms').click
    click_on 'Continue'
    click_on 'Add a task'
    fill_in 'name', with: 'This is a task'
    click_on 'Due Date'
    first("div[aria-disabled='false']").click
    click_on '+ Add estimate'
    fill_in 'estimate', with: '8'
    click_on 'Save Quote'
    fill_in 'description', with: 'This is a description'
    click_on 'Close Drawer'
    click_on 'Continue'
    fill_in 'proposalComment', with: 'This is a comment'
    click_on 'Send Proposal'
    expect(page).to have_content('Your proposal has been sent!')
  end
end
