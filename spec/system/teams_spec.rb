# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Teams', type: :system do
  let(:account) { create(:account, permissions: ["team_manager"]) }
  let(:manager) { create(:user, account: account) }
  let!(:non_manager) { create(:user, company: manager.company) }

  before do
    allow_any_instance_of(User).to receive(:sync_to_airtable)
  end

  it 'user can add a team member' do
    authenticate_as(manager)
    email = "test@#{manager.account.domain}"
    visit "/settings/team"
    click_on 'Add team member'
    fill_in 'firstName', with: "Jane"
    fill_in 'lastName', with: "Doe"
    fill_in 'email', with: email
    click_on 'Send Invite'
    expect(page).not_to have_content("Invite new member")
    user = Account.last
    expect(user.email).to eq(email)
  end

  it 'manager can promote another member to manager' do
    authenticate_as(manager)
    visit "/settings/team"
    check "Promote #{non_manager.account.name} to manager"
    expect(page).to have_content("#{non_manager.account.name} has been promoted to manager")
    expect(non_manager.account.reload.permissions).to include("team_manager")
  end

  it 'manager can demote another manager' do
    non_manager.account.update(permissions: ["team_manager"])
    authenticate_as(manager)
    visit "/settings/team"
    check "Demote #{non_manager.account.name}"
    expect(page).to have_content("#{non_manager.account.name} has been demoted")
    expect(non_manager.account.reload.permissions).not_to include("team_manager")
  end
end
