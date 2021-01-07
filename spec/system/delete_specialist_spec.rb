# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Deleting specialist account', type: :system do
  let!(:account) { create(:account, password: "testing123") }

  before do
    create(:specialist, account: account)
  end

  it 'allows viewer to delete their account' do
    visit "/login"
    fill_in "email", with: account.email
    fill_in "password", with: "testing123"
    click_on "Login"

    visit "/settings/password"
    click_on "Delete account"
    within "*[data-dialog]" do
      fill_in "confirm", with: "DELETE"
      click_on "Delete account"
    end

    expect(page).to have_content("Please sign in to your account")
    fill_in "email", with: account.email
    fill_in "password", with: "testing123"
    click_on "Login"
    expect(page).to have_content("Invalid login credentials, please try again.")
  end
end
