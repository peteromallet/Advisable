require "rails_helper"

describe "Converting an assisted project to a self serving one" do
  before :each do
    airtable = double(Airtable::Project)
    allow(airtable).to receive(:push)
    allow(airtable).to receive(:[]=)
    allow(airtable).to receive(:save)
    allow(Airtable::Project).to receive(:find).and_return(airtable)
  end
  
  it 'directs the user to the project setup flow' do
    project = create(:project, service_type: "Assisted", status: "Project Created")
    authenticate_as project.user
    visit "/projects/#{project.airtable_id}"
    click_on "Continue by yourself"
    expect(page).to have_content("What skill are you looking for")
  end
end