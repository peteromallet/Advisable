require "system_helper"

RSpec.describe 'Setting a password', type: :system do
  let(:account) { create(:account, password: nil) }
  let(:user) { create(:user, account: account) }

  it 'asks authenticated users to set a password when they havent yet set one' do
    authenticate_as(user)
    visit "/projects"
    expect(page).to have_content("Please set a password")
    fill_in "password", with: "testing123"
    fill_in "passwordConfirmation", with: "testing123"
    click_on "Set Password"
    expect(page).to have_current_path("/projects")
  end
end
