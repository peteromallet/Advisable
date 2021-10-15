# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Internal application view", type: :system do
  let(:application) { create(:application) }
  let!(:previous_project) { create(:previous_project, specialist: application.specialist) }
  let(:user) { create(:user) }

  before do
    application.application_references.create(previous_project: previous_project)
  end

  it "Renders the application details" do
    user.account.update(permissions: ["admin"])
    authenticate_as(user)
    visit "/internal/applications/#{application.uid}"
    expect(page).to have_content(application.specialist.account.name)
    expect(page).to have_content(application.introduction)
    expect(page).to have_content(previous_project.primary_skill.name)
  end

  context "when not an admin" do
    it "redirects to explorer" do
      user.account.update(permissions: [])
      authenticate_as(user)
      visit "/internal/applications/#{application.uid}"
      expect(page).not_to have_content(application.specialist.account.name)
      expect(page).to have_current_path("/explore")
    end
  end
end
