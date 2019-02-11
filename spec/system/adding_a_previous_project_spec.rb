require "rails_helper"

describe "Previous project management" do
  it "enables user to add a previous project" do
    specialist = create(:specialist)
    create(:industry, name: "Advertising")
    create(:skill, name: "Testing")
    skill = double(Airtable:Skill, id: "rec_123", fields: { "Name" => "Testing" })
    allow(Airtable::Skill).to receive(:active).and_return([skill])
    allow_any_instance_of(Airtable::OffPlatformProject).to receive(:push)
    allow_any_instance_of(Types::OffPlatformProject).to receive(:id).and_return("rec_1234")
    allow_any_instance_of(Types::OffPlatformProject).to receive(:airtable_id).and_return("rec_1234")

    visit "/specialists/#{specialist.airtable_id}/references"
    click_on "Add a previous project"
    # Step 1
    fill_in "clientName", with: "Testing Corp"
    input = find('.SuggestedSelect__control input')
    input.send_keys("Advert")
    input.send_keys(:return)
    fill_in "clientDescription", with: "client description"
    click_on "Next"
    # Step 2
    input = find('.SuggestedSelect__control input')
    input.send_keys("Test")
    input.send_keys(:return)
    fill_in "requirements", with: "requirements"
    fill_in "description", with: "description"
    click_on "Next"
    # Step 3
    fill_in "results", with: "results"
    click_on "Next"
    # Step 4
    fill_in "contactName", with: "John Doe"
    fill_in "contactJobTitle", with: "CEO"
    fill_in "contactEmail", with: "test@test.com"
    click_on "Complete"

    expect(page).to have_content("Testing at Testing Corp")
  end
end