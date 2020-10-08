require "rails_helper"

RSpec.describe "Magic links" do
  it "authenticates the user and uses the magic link" do
    user = create(:user)
    account = create(:account, user: user)
    magic_link = create(:magic_link, account: account, path: "/projects")

    visit "/projects?mlt=#{magic_link.token}&mluid=#{account.uid}&another=param"
    expect(page).to have_content("Find new talent")
    expect(page).to have_current_path("/projects?another=param")
  end

  context "when trying to access a diferent path" do
    it "does not authenticate the user" do
      user = create(:user)
      account = create(:account, user: user)
      magic_link = create(:magic_link, account: account, path: "/projects")

      visit "/settings?mlt=#{magic_link.token}&mluid=#{account.uid}"
      expect(current_path).to eq("/login")
    end
  end

  context "When the magic link has expired" do
    it "does not authenticate the user" do
      user = create(:user)
      account = create(:account, user: user)
      magic_link = create(:magic_link, expires_at: 1.hour.ago, account: account, path: "/projects")

      visit "/projects?mlt=#{magic_link.token}&mluid=#{account.uid}"
      expect(current_path).to eq("/login")
    end
  end

  context "When given an invalid token" do
    it "it ignores it" do
      user = create(:user)
      account = create(:account, user: user)
      magic_link = create(:magic_link, account: account, path: "/projects")
      visit "/projects?mlt=invalidToken&mluid=#{account.uid}"
      expect(current_path).to eq("/login")
    end
  end

  context "When given a valid token but invalid uid" do
    it "it ignores it" do
      user = create(:user)
      account = create(:account, user: user)
      magic_link = create(:magic_link, account: account, path: "/projects")
      visit "/projects?mlt=#{magic_link.token}&mluid=invalidUID"
      expect(current_path).to eq("/login")
    end
  end
end
