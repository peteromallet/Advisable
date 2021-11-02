# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Application invitation view", type: :system do
  let(:project) { create(:project) }

  context 'when the status is "Invited To Apply"' do
    let(:application) do
      create(:application, status: "Invited To Apply", project: project)
    end

    it "allows the user to appy" do
      authenticate_as(application.specialist)
      visit "/invites/#{application.uid}"
      click_on "Apply"
      expect(page).to have_content(project.primary_skill.name)
    end

    it "allows the user to decline the invitation" do
      authenticate_as(application.specialist)
      visit "/invites/#{application.uid}"
      click_on "Reject Invitation"
      select "Doesn’t seem like a good fit", from: "reason"
      click_on "Reject Invite"
      expect(page).to have_content(
        "Do you know anyone that would suit this project"
      )
    end
  end

  context "when the status is Appled" do
    let(:application) do
      create(:application, status: "Applied", project: project)
    end

    it "allows the user to update their application" do
      authenticate_as(application.specialist)
      visit "/invites/#{application.uid}"
      click_on "Update Application"
      expect(page).to have_content(project.primary_skill.name)
    end
  end

  context "when the status is 'Invitation Rejected'" do
    let(:application) do
      create(:application, status: "Invitation Rejected", project: project)
    end

    it "allows the user to change their mind and apply" do
      authenticate_as(application.specialist)
      visit "/invites/#{application.uid}"
      click_on "Apply Now"
      expect(page).to have_content(project.primary_skill.name)
    end
  end

  context "when the status is 'Application Rejected'" do
    let(:application) do
      create(:application, status: "Application Rejected", project: project)
    end

    it "allows the user to re-apply" do
      authenticate_as(application.specialist)
      visit "/invites/#{application.uid}"
      click_on "Apply Now"
      expect(page).to have_content(project.primary_skill.name)
    end
  end
end
