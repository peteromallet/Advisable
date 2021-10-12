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
end
