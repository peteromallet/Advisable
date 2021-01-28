# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Previous projects", type: :system do
  let(:specialist) { create(:specialist) }

  it "specialist can update project contact details" do
    project = create(:previous_project, specialist: specialist, draft: false, validation_status: "Pending")
    project.primary_skill = create(:skill, name: "Testing")
    project.save

    authenticate_as(specialist)
    visit "/freelancers/#{specialist.uid}"
    find("*[data-testid='project-card']").click
    within("*[role='dialog']") do
      first("*[aria-label='Edit project']").click
    end

    click_on "Validation"
    fill_in "contactName", with: "Michael Scott"
    fill_in "contactJobTitle", with: "CEO"
    select 'They managed the project', from: "contactRelationship"
    click_on "Save Changes"

    expect(page).to have_content("Contact details successfully updated!")
  end
end
