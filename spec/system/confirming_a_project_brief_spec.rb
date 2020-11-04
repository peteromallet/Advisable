require 'rails_helper'

RSpec.describe 'Confirming a project brief' do
  let(:project) do
    create(
      :project,
      {
        service_type: "Assisted",
        status: 'Brief Pending Confirmation',
        goals: %w[goal],
        characteristics: %w[characteristic another],
        required_characteristics: %w[characteristic],
        questions: %w[question1],
        likely_to_hire: 1,
        location_importance: 1,
        industry_experience_importance: 1
      }
    )
  end
  let(:project_skill) {
    create(:project_skill, project: project, primary: true)
  }

  before :each do
    allow_any_instance_of(Project).to receive(:sync_to_airtable)
  end

  it 'allows the user to confirm the project' do
    authenticate_as project.user
    visit "/projects/#{project.uid}/setup/publish"
    click_on "Edit Characteristics", match: :first
    fill_in "characteristics[1]", with: "Updated"
    click_on "Continue", match: :first
    find(:label, text: "Updated").click
    click_on "Continue", match: :first
    click_on "Confirm Project", match: :first
    expect(page).to have_content("Searching for")
    expect(project.reload.characteristics).to include("Updated")
    expect(project.reload.characteristics).not_to include("another")
    expect(project.reload.required_characteristics).to include("Updated")
  end
end
