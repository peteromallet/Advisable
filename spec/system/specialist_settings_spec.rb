require 'rails_helper'

RSpec.describe 'Specialist settings', type: :system do
  before do
    allow_any_instance_of(Specialist).to receive(:sync_to_airtable)
  end

  it 'allows them to add a previous project' do
    specialist = create(:specialist)
    create(:skill, name: 'React')
    create(:skill, name: 'Javascript')
    create(:skill, name: 'Ruby')

    create(:industry, name: 'Recruitment')
    create(:industry, name: 'Finance')

    authenticate_as specialist
    visit '/settings/references'
    click_on 'Add a previous project'

    # Client Details
    fill_in 'clientName', with: 'Acme Corp'
    industries = find_field('Search for an industry')
    industries.send_keys 'Recrui', :down, :enter
    industries.send_keys 'Finan', :down, :enter
    click_on 'Continue'

    fill_in 'description', with: Faker::Lorem.sentence(word_count: 24)
    skills = find_field('Search for a skill')
    skills.send_keys 'Reac', :down, :enter
    skills.send_keys 'Rub', :down, :enter
    click_on 'Continue'

    attach_file(
      'upload-image',
      Rails.root.join("spec/support/01.jpg"),
      make_visible: true
    )

    attach_file(
      'upload-image',
      Rails.root.join("spec/support/02.jpg"),
      make_visible: true
    )

    expect(page).not_to have_css('*[data-uploading]')
    second_image = find_all('*[class^=ImageTiles__StyledImageTile-]')[1]
    second_image.click
    within(second_image) { click_on 'Remove image' }

    click_on 'Continue'
    click_on 'Skip'

    fill_in 'contactName', with: Faker::Name.name
    fill_in 'contactJobTitle', with: 'CEO'
    click_on 'Submit Project'
    expect(page).to have_content('Thanks for adding the details')
  end

  it 'allows specialist to change their password' do
    account = create(:account, password: "testing123")
    specialist = create(:specialist, account: account)
    authenticate_as specialist
    visit '/settings/password'
    fill_in "currentPassword", with: "testing123"
    fill_in "password", with: "changed123"
    fill_in "passwordConfirmation", with: "changed123"
    click_on "Update password"
    expect(page).to have_content("password has been updated")
    expect(account.authenticate("changed123")).to be_truthy
  end

  it 'allows specialist to change their email' do
    account = create(:account, password: "testing123")
    specialist = create(:specialist, account: account)
    authenticate_as specialist
    visit "/settings/general"
    fill_in 'email', with: "update@test.com", fill_options: {clear: :backspace}
    click_on 'Save Changes'

    expect(page).to have_content('Your profile has been updated')
    expect(specialist.reload.account.email).to eq("update@test.com")
  end
end
