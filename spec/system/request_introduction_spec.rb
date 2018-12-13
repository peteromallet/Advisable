require 'rails_helper'

describe 'Request Introduction' do
  it 'Creates an interview request' do
    client = create(:client)
    project = create(:project, client: client)
    application = create(:application, status: "Applied", project: project)

    airtable_interview_record = double('Airtable::Interview', id: 'interview_1')
    expect(Airtable::Interview).to receive(:new).and_return(airtable_interview_record)
    expect(airtable_interview_record).to receive(:create)

    airtable_application_reocrd = double('Airtable::Application')
    expect(airtable_application_reocrd).to receive(:[]=).with('Application Status', 'Application Accepted').at_least(:once)
    expect(airtable_application_reocrd).to receive(:save)
    expect(Airtable::Application).to receive(:find).and_return(airtable_application_reocrd)

    authenticate_as project.client.users.first
    visit "/projects/#{project.airtable_id}/applied"
    click_on 'Request Call'
    page.all("div[class^=styles__TimeCell]")[10].click
    page.all("div[class^=styles__TimeCell]")[34].click
    page.all("div[class^=styles__TimeCell]")[58].click
    page.all("div[class^=styles__TimeCell]")[82].click
    page.all("div[class^=styles__TimeCell]")[94].click
    within '.ModalWindow' do
      click_on "Request Call"
    end

    expect(page).to have_content("An interview request has been sent")
  end
end
