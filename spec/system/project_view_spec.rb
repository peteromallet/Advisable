require 'rails_helper'

describe 'Project view', type: :system do
  before :each do
    allow_any_instance_of(Application).to receive(:sync_to_airtable)
    allow_any_instance_of(Interview).to receive(:sync_to_airtable)
    allow_any_instance_of(Project).to receive(:sync_to_airtable)
  end

  let!(:project) { create(:project, status: 'Brief Confirmed') }
  let!(:application1) do
    create(:application, status: 'Applied', score: 90, project: project)
  end
  let!(:application2) do
    create(:application, status: 'Applied', score: 90, project: project)
  end
  let!(:application3) do
    create(:application, status: 'Applied', score: 90, project: project)
  end

  it 'allows user to accept and reject matches' do
    project.user.complete_tutorial('RECOMMENDATIONS')

    monday = Date.parse('monday')
    delta = monday > Date.today ? 0 : 7
    next_monday = monday + delta

    authenticate_as project.user
    visit "/projects/#{project.uid}"

    # Handle first match
    click_on 'Accept'
    find("[aria-label='#{next_monday.strftime('%-d %b %Y, 10:00')}']").click
    find("[aria-label='#{next_monday.strftime('%-d %b %Y, 10:30')}']").click
    find("[aria-label='#{next_monday.strftime('%-d %b %Y, 11:00')}']").click
    find("[aria-label='#{next_monday.strftime('%-d %b %Y, 11:30')}']").click
    find("[aria-label='#{next_monday.strftime('%-d %b %Y, 12:00')}']").click
    find("[aria-label='#{next_monday.strftime('%-d %b %Y, 12:30')}']").click
    click_on 'Request Call'
    expect(page).to have_text(application2.specialist.name)

    # Accept second match, no need to select availability because its stored
    # from the first time.
    click_on 'Accept'
    click_on 'Request Call'
    expect(page).to have_text(application3.specialist.name)

    # Reject third match
    click_on 'Reject'
    within '*[role=dialog]' do
      click_on 'Reject'
    end

    expect(page).to have_text(/you have been matched with 2/i)
  end

  it 'allows the viewer to reject an accepted candidate' do
    candidate =
      create(:application, project: project, status: 'Application Accepted')
    authenticate_as project.user
    visit "/projects/#{project.uid}/candidates/#{candidate.uid}"
    click_on 'Reject'
    within '*[role=dialog]' do
      click_on 'Reject'
    end
    expect(page).to have_text('No Candidates')
  end
end
