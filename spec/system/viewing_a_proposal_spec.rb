require 'rails_helper'

describe 'Accepting a proposal' do
  let(:user) { create(:user, project_payment_method: "Bank Transfer") }
  let(:project) { create(:project, user: user )}
  let(:application) { create(:application, status: 'Proposed', project: project) }

  before :each do
    allow_any_instance_of(Application).to receive(:sync_to_airtable)
  end

  it 'accepts the proposal' do
    project = application.project
    authenticate_as project.user
    visit "/projects/#{project.airtable_id}/applications/#{application.airtable_id}/proposal"

    click_on "Start working with #{application.specialist.first_name}"
    find(:label, text: "Flexible").click
    fill_in "monthlyLimit", with: "65"
    click_on "Continue"
    expect(page).to have_content('Add a task')
  end
end
