require "rails_helper"

describe "Creating a project" do
  it "creates a project record" do
    airtable = double(Airtable::Project)
    allow(Airtable::Project).to receive(:new).and_return(airtable)
    allow(airtable).to receive(:create)
    allow(airtable).to receive(:id).and_return('rec_1234')

    user = create(:user)
    create(:skill, name: "Testing", profile: true, category: "Marketing")
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