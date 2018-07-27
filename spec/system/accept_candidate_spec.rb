require 'rails_helper'

describe 'Accepting an application' do
  let!(:project) { create(:project) }
  let!(:application) { create(:application, project: project) }

  it "sets the applicaton status to Application Accepted" do
    airtableApplication = double("Airtable::Application")
    allow(airtableApplication).to receive(:[]=)
    allow(airtableApplication).to receive(:save)
    expect(Airtable::Application).to receive(:find).with(application.airtable_id)
      .and_return(airtableApplication)
    visit "/projects/#{project.airtable_id}"
    expect(page).to have_content(application.introduction)
    click_on 'Request Introduction'
    click_on 'Request'
    expect(page).to_not have_content(application.introduction)
    expect(application.reload.status).to eq('Application Accepted')
  end
end
