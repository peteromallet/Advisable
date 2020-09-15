require 'rails_helper'

RSpec.describe 'Previous project verification', type: :system do
  before :each do
    allow_any_instance_of(Review).to receive(:sync_to_airtable)

    OmniAuth.config.test_mode = true
    OmniAuth.config.add_mock(
      :linkedin,
      {
        provider: 'linkedin',
        uid: '123545',
        info: {
          name: 'John Doe', first_name: 'John', last_name: 'Doe', image: nil
        }
      }
    )
  end

  let(:previous_project) do
    create(
      :previous_project,
      validation_status: 'Pending', contact_name: 'John Doe'
    )
  end

  it 'allows viewer to verify and review the project' do
    visit "/verify_project/#{previous_project.uid}"
    click_on text: /login with/i
    click_on 'Verify Project'
    find('label[aria-label="Rate Skills 5 stars"]').click
    find('label[aria-label="Rate Quality of work 5 stars"]').click
    find('label[aria-label="Rate Adherence to schedule 5 stars"]').click
    find('label[aria-label="Rate Communication 5 stars"]').click
    find('label[aria-label="Rate Availability 5 stars"]').click
    click_on 'Continue'
    fill_in 'comment', with: 'Really great'
    click_on 'Submit Review'
    expect(page).to have_text(/thanks/i)
  end
end
