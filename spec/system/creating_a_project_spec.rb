require "rails_helper"

describe "Creating a project" do
  before :each do
    stub_request(:post, /https:\/\/api\.airtable\.com\/v0\/.*\/Projects/).
    to_return(status: 200, body: {
      "id": "rec_123",
      "fields": {}
    }.to_json, headers: {})
  end

  it "creates a project record" do
    create(:skill, name: "Testing")
    allow(Airtable::Skill).to receive(:active).and_return([
      OpenStruct.new(id: "rec_1234", fields: {
        "Name" => "Testing"
      })
    ])

    user = create(:user)
    authenticate_as user
    visit '/projects'
    find("div[class^='styles__NewProject']").click
    find('.SuggestedSelect__control').click
    input = find('.SuggestedSelect__control input')
    input.send_keys("Test")
    input.send_keys(:return)
    find('h4', text: "Self-Service").click
    expect(page).to have_content("Company Overview")
  end
end