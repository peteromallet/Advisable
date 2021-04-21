# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Sharing an application', type: :system do
  let(:application) { create(:full_application, status: "Applied") }

  before do
    allow_any_instance_of(User).to receive(:sync_to_airtable)
    create(:user, {
      company: application.project.user.company,
      account: create(:account, first_name: "Jake", last_name: "Peralta")
    })
  end

  it 'allows user to invite existing team members' do
    application.project.user.account.complete_tutorial('recommendations')
    authenticate_as application.project.user
    visit "/projects/#{application.project.uid}/applications/#{application.uid}"
    within "*[data-testid=actionBar]" do
      click_on 'Share'
    end
    click_on "Share with Jake"
    expect(page).to have_content("We have sent an invite to Jake Peralta")
  end

  it 'allows user to share an application with a team member' do
    application.project.user.account.complete_tutorial('recommendations')
    authenticate_as application.project.user
    visit "/projects/#{application.project.uid}/applications/#{application.uid}"
    within "*[data-testid=actionBar]" do
      click_on 'Share'
    end

    within "*[role=dialog] form" do
      fill_in "firstName", with: "Charles"
      fill_in "lastName", with: "Boyle"
      fill_in "email", with: "charles.boyle@test.com"
      click_on "Share"
    end

    expect(page).to have_content("We have sent an invite to Charles")
  end
end
