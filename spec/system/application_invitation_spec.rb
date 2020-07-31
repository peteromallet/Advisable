require 'rails_helper'

describe 'Application invitation view' do
  let(:project) { create(:project) }

  before :each do
    airtable_record = double(Airtable::Application)
    allow(airtable_record).to receive(:push)
    allow(Airtable::Application).to receive(:find).and_return(airtable_record)
  end

  context 'when the status is "Invited To Apply"' do
    let(:application) do
      create(:application, status: 'Invited To Apply', project: project)
    end

    it 'allows the user to appy' do
      visit "/invites/#{application.airtable_id}"
      click_on 'Apply'
      expect(page).to have_content(project.primary_skill.name)
    end

    it 'allows the user to decline the invitation' do
      visit "/invites/#{application.airtable_id}"
      click_on 'Reject Invitation'
      select 'No availability currently', from: 'reason'
      click_on 'Reject Invite'
      expect(page).to have_content(
        'Do you know anyone that would suit this project'
      )
    end
  end

  context 'when the status is Appled' do
    let(:application) do
      create(:application, status: 'Applied', project: project)
    end

    it 'allows the user to update their application' do
      visit "/invites/#{application.airtable_id}"
      click_on 'Update Application'
      expect(page).to have_content(project.primary_skill.name)
    end
  end

  context "when the status is 'Invitation Rejected'" do
    let(:application) do
      create(:application, status: 'Invitation Rejected', project: project)
    end

    it 'allows the user to change their mind and apply' do
      visit "/invites/#{application.airtable_id}"
      click_on 'Apply Now'
      expect(page).to have_content(project.primary_skill.name)
    end
  end

  context "when the status is 'Application Rejected'" do
    let(:application) do
      create(:application, status: 'Application Rejected', project: project)
    end

    it 'allows the user to re-apply' do
      visit "/invites/#{application.airtable_id}"
      click_on 'Apply Now'
      expect(page).to have_content(project.primary_skill.name)
    end
  end
end
