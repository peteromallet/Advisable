# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Projects view', type: :system do
  let(:user) { create(:user) }

  before do
    allow_any_instance_of(User).to receive(:sync_to_airtable)
    allow_any_instance_of(Project).to receive(:sync_to_airtable)
  end

  it 'shows the users projects' do
    project = create(:project, user: user)
    authenticate_as(user)
    visit "/projects"
    expect(page).to have_content(project.primary_skill.name)
  end

  it 'allows a user to create a new project' do
    authenticate_as(user)
    visit "/projects"
    find("*[aria-label='Find a new freelancer']").click
    expect(page).to have_content("What skills should this specialist have?")
  end

  context "when the user's company industry isn't set" do
    let(:company) { create(:company, industry: nil) }
    let(:user) { create(:user, company: company) }

    it 'asks the user for their industry' do
      create(:industry, name: "Testing")
      authenticate_as(user)
      visit "/projects"
      expect(page).to have_content("We need to confirm some details")
      modal = find("*[role=dialog]")
      within(modal) do
        industry = find_field("Industry")
        industry.send_keys("test", :down, :return)
        select("Startup", from: "companyType")
        click_on("Update Details")
      end
      expect(page).not_to have_css("*[role=dialog]")
    end
  end
end
