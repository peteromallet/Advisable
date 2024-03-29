# frozen_string_literal: true

require "rails_helper"

RSpec.describe "magic links", type: :system do
  let(:account) { create(:account, confirmed_at: nil, completed_tutorials: ["onboarding"]) }
  let(:magic_link) { create(:magic_link, account:, path: "/messages") }

  before { create(:user, account:) }

  it "authenticates the user and uses the magic link" do
    visit "/messages?mlt=#{magic_link.token}&mluid=#{account.uid}&another=param"
    expect(page).to have_content("messages")
    expect(page).to have_current_path("/messages?another=param")
    expect(account.reload.confirmed_at).not_to be_nil
  end

  context "when trying to access a diferent path" do
    it "does not authenticate the user" do
      visit "/settings?mlt=#{magic_link.token}&mluid=#{account.uid}"
      expect(page).to have_current_path("/login")
    end
  end

  context "when the magic link has expired" do
    let(:magic_link) { create(:magic_link, expires_at: 1.hour.ago, account:, path: "/messages") }

    it "does not authenticate the user" do
      visit "/messages?mlt=#{magic_link.token}&mluid=#{account.uid}"
      expect(page).to have_current_path("/login")
    end
  end

  context "when given an invalid token" do
    it "ignores it" do
      visit "/messages?mlt=invalidToken&mluid=#{account.uid}"
      expect(page).to have_current_path("/login")
    end
  end

  context "when given a valid token but invalid uid" do
    it "ignores it" do
      visit "/messages?mlt=#{magic_link.token}&mluid=invalidUID"
      expect(page).to have_current_path("/login")
    end
  end
end
