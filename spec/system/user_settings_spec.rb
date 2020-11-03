require 'rails_helper'

RSpec.describe 'User settings' do
  it 'allows user to change their password' do
    account = create(:account, password: "testing123")
    user = create(:user, account: account)
    authenticate_as user
    visit '/settings/password'
    fill_in "currentPassword", with: "testing123"
    fill_in "password", with: "changed123"
    fill_in "passwordConfirmation", with: "changed123"
    click_on "Update password"
    expect(page).to have_content("password has been updated")
  end
end
