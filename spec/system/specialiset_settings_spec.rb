require 'rails_helper'

RSpec.describe 'Specialist settings' do
  it 'allows them to add a previous project' do
    specialist = create(:specialist)
    create(:skill, name: 'React')
    create(:skill, name: 'Javascript')
    create(:skill, name: 'Ruby')

    create(:industry, name: 'Recruitment')
    create(:industry, name: 'Finance')

    authenticate_as specialist
    visit '/profile/references'
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
      Rails.root + 'spec/support/01.jpg',
      make_visible: true
    )

    attach_file(
      'upload-image',
      Rails.root + 'spec/support/02.jpg',
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
end
