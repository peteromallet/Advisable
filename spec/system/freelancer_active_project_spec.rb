# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Freelancer active project view', type: :system do
  let(:application) { create(:application, status: 'Working') }

  before do
    allow_any_instance_of(Application).to receive(:sync_to_airtable)
    allow_any_instance_of(Task).to receive(:sync_to_airtable)
    application.specialist.account.complete_tutorial('fixed_projects')
    application.specialist.account.complete_tutorial('flexible_projects')
    authenticate_as application.specialist
  end

  context 'when there are no tasks' do
    it 'enables the freelancer to add a task' do
      visit "/clients/#{application.uid}"
      click_on 'Add a project'
      fill_in 'name', with: 'This is a task'
      click_on 'Due Date'
      click_on 'Next Month'
      first("div[aria-disabled='false']").click
      fill_in 'description', with: 'This is a description'
      click_on 'Close Drawer'
      expect(page).to have_content('This is a task')
    end
  end

  context 'when there is an existing task' do
    before do
      create(
        :task,
        {
          estimate: 8,
          stage: 'Assigned',
          application: application,
          due_date: 2.days.from_now,
          name: 'This is an existing task',
          description: 'This is the task description'
        }
      )
    end

    it 'the freelancer can view the task' do
      visit "/clients/#{application.uid}"
      find('h5', text: 'This is an existing task').click
      expect(page).to have_content('This is the task description')
    end

    it 'the freelancer can create an additional task' do
      visit "/clients/#{application.uid}"
      click_on 'Add a project'
      fill_in 'name', with: 'This is a task'
      click_on 'Due Date'
      click_on 'Next Month'
      first("div[aria-disabled='false']").click
      fill_in 'description', with: 'This is a description'
      click_on 'Close Drawer'
      expect(page).to have_content('This is a task')
    end
  end

  context "when there is an existing task with a stage of 'Quote Requested'" do
    before do
      create(
        :task,
        {
          estimate: nil,
          stage: 'Quote Requested',
          application: application,
          due_date: 2.days.from_now,
          name: 'This is an existing task',
          description: 'This is the task description'
        }
      )
    end

    it 'prompts the freelancer to provide an estimate' do
      visit "/clients/#{application.uid}"
      find('h5', text: 'This is an existing task').click
      click_on 'Set estimate'
      fill_in 'estimate', with: '8'
      click_on 'Save'
      expect(page).to have_content('8 hours')
    end
  end

  context "when there is an existing task with a stage of 'Assigned'" do
    before do
      create(
        :task,
        {
          estimate: 8,
          stage: 'Assigned',
          application: application,
          due_date: 2.days.from_now,
          name: 'This is an existing task',
          description: 'This is the task description'
        }
      )
    end

    it 'enables the freelancer to start working on the task' do
      allow(Tasks::CreateInvoiceItem).to receive(:call)
      visit "/clients/#{application.uid}"
      find('h5', text: 'This is an existing task').click
      click_on 'Start Working'
    end
  end

  context "when there is an existing task with a stage of 'Working'" do
    before do
      create(
        :task,
        {
          estimate: 8,
          stage: 'Working',
          application: application,
          due_date: 2.days.from_now,
          name: 'This is an existing task',
          description: 'This is the task description'
        }
      )
    end

    it 'enables the freelancer to submit the task for approval' do
      visit "/clients/#{application.uid}"
      find('h5', text: 'This is an existing task').click
      click_on 'Mark as complete'
      click_on 'Complete'
      expect(page).to have_content('SUBMITTED')
    end
  end

  it 'allows the freelancer to stop working with the client' do
    visit "/clients/#{application.uid}"
    click_on 'Stop Working'
    within "*[data-dialog]" do
      fill_in "reason", with: "Project has ended"
      click_on "Stop Working"
    end
    expect(page).to have_content('You have stopped working with')
  end

  context "when the project is fixed and task stage is 'Not Assigned'" do
    let(:application) { create(:application, status: 'Working', project_type: "Fixed") }

    before do
      create(:task, stage: "Not Assigned", name: "Test task", application: application)
    end

    it 'allows the freelancer to request to start working' do
      visit("/clients/#{application.uid}")
      find("h5", text: "Test task").click
      click_on("Request to Start Working")
      expect(page).to have_content("You have requested to start working")
    end
  end
end
