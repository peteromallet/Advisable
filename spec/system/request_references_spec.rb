require 'rails_helper'

describe 'Requesting references' do
  let(:project) { create(:project) }
  let!(:application) { create(:application, status: "Application Accepted", project: project) }

  before :each do
    allow_any_instance_of(Application).to receive(:sync_to_airtable)
  end

  context "from applicants view" do
    it 'confirms request with a notification' do
      authenticate_as project.user
      visit "/projects/#{project.airtable_id}/introduced"
      click_on 'Request References'
      within '.ModalWindow' do
        click_on "Request References"
      end

      expect(page).to have_content("References have been requested")
    end
  end

  context "from applicant detail view" do
    it 'confirms request with a notification' do
      authenticate_as project.user
      visit "/projects/#{project.airtable_id}/applications/#{application.airtable_id}"
      click_on 'Request References'
      within '.ModalWindow' do
        click_on "Request References"
      end

      expect(page).to have_content("References have been requested")
    end
  end
end
