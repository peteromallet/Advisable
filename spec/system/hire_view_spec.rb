# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Hire view", type: :system do
  let(:application) { create(:application, status: "Application Accepted") }

  it "User can hire a candidate" do
    authenticate_as(application.project.user)
    visit("/hire")
    expect(page).to have_content(application.specialist.account.name)
    click_on("Hire")
    expect(page).to have_current_path("/book/#{application.uid}")
  end

  it "User can message a candidate" do
    authenticate_as(application.project.user)
    visit("/hire")
    expect(page).to have_content(application.specialist.account.name)
    click_on("Message")
    fill_in("content", with: "Hello!")
    click_on("Send Message")
    expect(page).to have_content("Your message has been sent")
    message = Message.order(created_at: :asc).last
    expect(message.content).to eq("Hello!")
  end

  it "allows user to remove a candidate" do
    authenticate_as(application.project.user)
    visit("/hire")
    expect(page).to have_content(application.specialist.account.name)
    click_on("Remove")
    fill_in("message", with: "Not interested")
    within("*[role='dialog']") do
      click_on("Remove")
    end
    expect(page).not_to have_content(application.specialist.account.name)
    message = Message.order(created_at: :asc).last
    expect(message.content).to eq("Not interested")
  end

  context "when application has an interview scheduled" do
    let!(:application) { create(:application, status: "Interview Scheduled") }
    let!(:interview) { create(:interview, user: application.project.user, application: application, starts_at: 1.day.from_now, status: "Call Scheduled") }

    it "allows user to click into interview details" do
      authenticate_as(application.project.user)
      visit("/hire")
      expect(page).to have_content(application.specialist.account.name)
      click_on("Manage interview")
      expect(page).to have_current_path("/interviews/#{interview.uid}")
    end
  end

  context "when application has a status of 'Proposed'" do
    let!(:application) { create(:application, status: "Proposed", proposal_comment: "What do you think of this?") }

    it "allows user to click into proposal details" do
      authenticate_as(application.project.user)
      visit("/hire")
      expect(page).to have_content(application.specialist.account.name)
      click_on("View proposal")
      expect(page).to have_content(application.proposal_comment)
    end
  end

  context "when user is not authenticated" do
    it "redirects to login" do
      visit("/hire")
      expect(page).to have_content("Welcome Back!")
    end
  end
end
