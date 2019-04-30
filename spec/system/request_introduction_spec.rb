require 'rails_helper'

describe 'Request Introduction' do
  before :each do
    stub_request(:post, /https:\/\/api\.airtable\.com\/v0\/.*\//).
    to_return(status: 200, body: {
      "id": "rec_123",
      "fields": {}
    }.to_json, headers: {})

    allow_any_instance_of(Application).to receive(:sync_to_airtable)
  end

  it 'Creates an interview request' do
    user = create(:user)
    project = create(:project, user: user)
    application = create(:application, status: "Applied", project: project)

    authenticate_as project.user
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
