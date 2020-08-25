require 'rails_helper'

describe 'Logging in' do
  it 'redirects the user back to where they tried to go' do
    user = create(:user, password: 'testing123')
    project = create(:project, user: user)
    visit "/projects/#{project.airtable_id}/applied"
    fill_in 'email', with: user.email
    fill_in 'password', with: 'testing123'
    click_on 'Login'
    expect(page).to have_current_path(
      "/projects/#{project.airtable_id}/applied"
    )
  end
end
