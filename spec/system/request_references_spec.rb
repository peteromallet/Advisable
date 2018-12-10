require 'rails_helper'

describe 'Requesting references' do
  let(:project) { create(:project) }
  let!(:application) { create(:application, status: "Application Accepted", project: project) }

  before :each do
    airtable_record = double('Airtable::Application')
    expect(airtable_record).to receive(:[]=).with('References Requested', 'Yes').exactly(:once)
    expect(airtable_record).to receive(:save)
    expect(Airtable::Application).to receive(:find).and_return(airtable_record)
  end

  context "from applicants view" do
    it 'confirms request with a notification' do
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
      visit "/projects/#{project.airtable_id}/applications/#{application.airtable_id}"
      click_on 'Request References'
      within '.ModalWindow' do
        click_on "Request References"
      end

      expect(page).to have_content("References have been requested")
    end
  end
end
