# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Specialist settings', type: :system do
  before do
    allow_any_instance_of(Specialist).to receive(:sync_to_airtable)
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
