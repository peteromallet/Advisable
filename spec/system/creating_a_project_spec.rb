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
    visit '/project_setup'
    find('.SuggestedSelect__control').click
    input = find('.SuggestedSelect__control input')
    input.send_keys("Test")
    input.send_keys(:return)
    click_on 'Continue'
    expect(page).to have_content("Company Overview")
  end
end