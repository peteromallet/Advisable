require "rails_helper"

describe "Freelancer active project view" do
  let(:application) { create(:application, status: "Working") }

  before :each do
    allow_any_instance_of(Task).to receive(:sync_to_airtable)
    authenticate_as application.specialist
  end

  context "when there are no tasks" do
    it "enables the freelancer to add a task" do
      visit "/clients/#{application.airtable_id}"
      click_on "Add a task"
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
    before :each do
      create(:task, {
        estimate: 8,
        stage: "Assigned",
        application: application,
        due_date: 2.days.from_now,
        name: "This is an existing task",
        description: "This is the task description"
      })
    end

    it "enables the freelancer to view the task" do
      visit "/clients/#{application.airtable_id}"
      find('h5', text: 'This is an existing task').click
      expect(page).to have_content("This is the task description")
    end

    it "allows the freelancer to create a new task for the freelancer" do
      visit "/clients/#{application.airtable_id}"
      click_on "Add a task"
      fill_in "name", with: "This is a task"
      click_on "Due Date"
      click_on "Next Month"
      first("div[aria-disabled='false']").click
      fill_in "description", with: "This is a description"
      click_on "Close Drawer"
      expect(page).to have_content("This is a task")
    end
  end

  context "when there is an existing task with a stage of 'Quote Requested'" do
    before :each do
      create(:task, {
        estimate: nil,
        stage: "Quote Requested",
        application: application,
        due_date: 2.days.from_now,
        name: "This is an existing task",
        description: "This is the task description"
      })
    end

    it "prompts the freelancer to provide an estimate" do
      visit "/clients/#{application.airtable_id}"
      find('h5', text: 'This is an existing task').click
      expect(page).to have_content("has requested a quote for this task.")
      click_on "Estimate"
      fill_in "estimate", with: "8"
      click_on "Save"
      expect(page).to have_content("You have provided a quote for this task")
    end
  end

  context "when there is an existing task with a stage of 'Assigned'" do
    before :each do
      create(:task, {
        estimate: 8,
        stage: "Assigned",
        application: application,
        due_date: 2.days.from_now,
        name: "This is an existing task",
        description: "This is the task description"
      })
    end

    it "enables the freelancer to start working on the task" do
      visit "/clients/#{application.airtable_id}"
      find('h5', text: 'This is an existing task').click
      click_on "Start Working"
      expect(page).to have_content("You have marked this task as in progress.")
    end
  end

  context "when there is an existing task with a stage of 'Working'" do
    before :each do
      create(:task, {
        estimate: 8,
        stage: "Working",
        application: application,
        due_date: 2.days.from_now,
        name: "This is an existing task",
        description: "This is the task description"
      })
    end

    it "enables the freelancer to submit the task for approval" do
      visit "/clients/#{application.airtable_id}"
      find('h5', text: 'This is an existing task').click
      click_on "Submit for approval"
      within "div[class^='styles__ConfirmationContainer']" do
        click_on "Submit"
      end
      expect(page).to have_content("You have submitted this task for approval.")
    end
  end
end