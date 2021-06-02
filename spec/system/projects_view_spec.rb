# frozen_string_literal: true

require 'rails_helper'

RSpec.describe("Projects view", type: :system) do
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
end
