# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Managing talent", type: :system do
  let(:application) { create(:application, status: "Working") }

  before do
    allow_any_instance_of(Task).to receive(:sync_to_airtable)
    authenticate_as application.project.user
    application.project.user.account.complete_tutorial("fixed_projects")
  end

  context "when there are no tasks" do
    it "enables the client to add a task" do
      visit "/manage/#{application.uid}"
      click_on "Add a project"
      fill_in "name", with: "This is a task"
      click_on "Due Date"
      click_on "Next Month"
      first("div[aria-disabled='false']").click
      fill_in "description", with: "This is a description"
      click_on "Close Drawer"
      expect(page).to have_content("This is a task")
    end
  end

  context "when there is an existing task" do
    before do
      create(
        :task,
        {
          estimate: 8,
          stage: "Assigned",
          application: application,
          due_date: 2.days.from_now,
          name: "This is an existing task",
          description: "This is the task description"
        }
      )
    end

    it "enables the client to view the task" do
      visit "/manage/#{application.uid}"
      find("h5", text: "This is an existing task").click
      expect(page).to have_content("This is the task description")
    end

    it "allows the client to create a new task for the freelancer" do
      visit "/manage/#{application.uid}"
      click_on "Add a project"
      fill_in "name", with: "This is a task"
      click_on "Due Date"
      click_on "Next Month"
      first("div[aria-disabled='false']").click
      fill_in "description", with: "This is a description"
      click_on "Close Drawer"
      expect(page).to have_content("This is a task")
    end
  end

  context "when there is a task with a stage of 'Not Assigned'" do
    before do
      create(
        :task,
        {
          estimate: nil,
          stage: "Not Assigned",
          application: application,
          due_date: 2.days.from_now,
          name: "This is an existing task",
          description: "This is the task description"
        }
      )
    end

    it "enables the client to request a quote for the task" do
      visit "/manage/#{application.uid}"
      find("h5", text: "This is an existing task").click
      click_on "Request Quote"
      expect(page).to have_content(
        "A quote has been requested for this project"
      )
    end

    it "enables the client to assign the task" do
      visit "/manage/#{application.uid}"
      find("h5", text: "This is an existing task").click
      click_on "Assign Task"
      within "div[class^='styles__ConfirmationContainer']" do
        click_on "Assign"
      end
      expect(page).to have_content("This project has been assigned")
    end

    it "allows the client to delete it" do
      allow_any_instance_of(Task).to receive(:remove_from_airtable)
      visit "/manage/#{application.uid}"
      find("h5", text: "This is an existing task").click
      click_on "Open task actions menu"
      click_on "Delete task"
      click_on "Delete"
      expect(page).not_to have_content("This is an existing task")
    end
  end

  context "when there is a task with a stage of 'Quote Requested'" do
    before do
      create(
        :task,
        {
          estimate: nil,
          stage: "Quote Requested",
          application: application,
          due_date: 2.days.from_now,
          name: "This is an existing task",
          description: "This is the task description"
        }
      )
    end

    it "enables the client to assign the task" do
      visit "/manage/#{application.uid}"
      find("h5", text: "This is an existing task").click
      click_on "Assign Task"
      click_on "Assign"
      expect(page).to have_content("This project has been assigned")
    end

    it "allows the client do edit the task" do
      visit "/manage/#{application.uid}"
      find("h5", text: "This is an existing task").click
      fill_in "name", with: "Updated task name"
      click_on "Close Drawer"
      expect(page).to have_content("Updated task name")
    end
  end

  context "when there is a task with a stage of 'Quote Provided'" do
    before do
      create(
        :task,
        {
          estimate: 8,
          stage: "Quote Provided",
          application: application,
          due_date: 2.days.from_now,
          name: "This is an existing task",
          description: "This is the task description"
        }
      )
    end

    it "enables the client to assign the task" do
      visit "/manage/#{application.uid}"
      find("h5", text: "This is an existing task").click
      click_on "Assign Task"
      click_on "Assign"
      expect(page).to have_content("This project has been assigned")
    end

    it "allows the client to edit the task and remove the estimate" do
      visit "/manage/#{application.uid}"
      find("h5", text: "This is an existing task").click
      find("textarea[name='name']").click
      click_on "Continue"
      fill_in "name", with: "Changed"
      click_on "Close Drawer"
      expect(page).to have_content("Changed")
    end
  end

  context "when there is a task with a stage of 'Submitted'" do
    before do
      create(
        :task,
        {
          estimate: 8,
          stage: "Submitted",
          application: application,
          due_date: 2.days.from_now,
          name: "This is an existing task",
          description: "This is the task description"
        }
      )
    end

    it "enables the client to approve the task" do
      visit "/manage/#{application.uid}"
      find("h5", text: "This is an existing task").click
      click_on "Approve"
      within "div[class^='styles__ConfirmationContainer']" do
        click_on "Approve"
      end
      expect(page).to have_content("This project has been completed")
    end
  end

  it "allows user to report an issue with the freelancer" do
    visit "/manage/#{application.uid}"
    click_on "Report Issue"
    within "*[role=dialog]" do
      fill_in "message", with: "This is the issue message"
      click_on "Report Issue"
    end

    expect(page).to have_content("We have received your report")
  end
end
