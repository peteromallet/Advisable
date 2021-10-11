# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Discover', type: :system do
  let(:account) { create(:account, permissions: ["team_manager"], features: {"case_studies" => true}) }
  let(:user) { create(:user, account: account) }
  let(:article1) { create(:case_study_article, title: "Article One", score: 100) }
  let(:article2) { create(:case_study_article, score: 90) }
  let!(:search) do
    create(:case_study_search, {
      name: "Test list",
      user: user,
      results: [article1.id, article2.id]
    })
  end

  context "when not authenticated" do
    it "/explore redirects to the login page" do
      visit '/explore'
      expect(page).to have_content("Please sign in to your account")
    end
  end

  context "when logged in as specialist" do
    it "/explore redirects to /appliications" do
      authenticate_as(create(:specialist, application_stage: "Accepted"))
      visit '/explore'
      expect(page).to have_content("You have not applied to any projects yet")
    end
  end

  describe "/explore" do
    it "lists the users shortlists and they can click into one" do
      search = create(:case_study_search, name: "Test shortlist", user: user)
      authenticate_as(user)
      visit("/explore")
      expect(page).to have_content("Test shortlist")
      click_link("Test shortlist")
      expect(page).to have_current_path("/explore/#{search.uid}")
    end

    context "when user has no shortlists" do
      it "shows an empty state to create a shortlist" do
        search.destroy
        authenticate_as(user)
        visit("/explore")
        expect(page).to have_content("You haven't created any shortlists")
      end
    end
  end

  describe "shortlist view" do
    it 'user can archive a result from a the shortlist view' do
      authenticate_as(user)
      expect(search.reload.archived).to be_empty
      visit "/explore/#{search.uid}"
      expect(page).to have_content(article1.title)
      first(:button, "Remove").click
      within("*[role='dialog']") do
        click_on("Remove")
      end
      expect(page).not_to have_content(article1.title)
      expect(search.reload.archived).to include(article1.id)
    end

    it 'user can click in to view a case study and back again' do
      authenticate_as(user)
      visit("/explore/#{search.uid}")
      find("*[data-testid=title]", text: article1.title).click
      expect(page).to have_current_path("/explore/#{search.uid}/#{article1.uid}")
      click_link("Back")
      expect(page).to have_current_path("/explore/#{search.uid}")
    end
  end

  describe "article view" do
    it "user can archive a result" do
      authenticate_as(user)
      expect(search.archived).to be_empty
      visit "/explore/#{search.uid}/#{article1.uid}"
      expect(page).to have_content(article1.title)
      first(:button, "Remove").click
      within("*[role='dialog']") do
        find("label", text: "Just doesn't seem like a good fit").click
        click_on("Remove")
      end
      expect(page).to have_current_path("/explore/#{search.uid}")
      expect(page).not_to have_content(article1.title)
      expect(search.reload.archived).to include(article1.id)
    end
  end

  it 'user can create a new shortlist' do
    twitter_ads = create(:skill, name: "Twitter Ads")
    facebook_ads = create(:skill, name: "Facebook Ads")
    create(:case_study_skill, article: article1, skill: twitter_ads)
    create(:case_study_skill, article: article1, skill: facebook_ads)

    authenticate_as(user)
    visit '/explore'
    click_on("New Shortlist")
    # Skills
    click_on("Facebook Ads")
    click_on("Twitter Ads")
    click_on("Continue")
    # Goals
    find("label", text: "Increase Web Traffic").click
    find("label", text: "Rebranding").click
    find("label", text: "Improve Process").click
    click_on("Continue")
    # Preferences
    find("label", text: "The freelancer is available right now").click
    find("label", text: "The cost of this project is within our overall budget").click
    click_on("Search for specialists")
    # Results
    expect(page).to have_content(article1.title)
    expect(page).not_to have_content(article2.title)
  end

  it 'user can delete a search' do
    search = create(:case_study_search, {
      user: user,
      name: "Test search",
      finalized_at: Time.zone.now,
      results: []
    })

    authenticate_as(user)
    expect(user.searches.count).to eq(2)
    visit "/explore/#{search.uid}"
    click_on("Delete search")
    within("*[role='dialog']") do
      click_on("Delete")
    end
    expect(page).to have_current_path("/explore")
    expect(user.reload.searches.count).to eq(1)
  end

  context "when trying to view a search they dont have access to" do
    it "shows a not authorized error" do
      search = create(:case_study_search)
      authenticate_as(user)
      visit("/explore/#{search.uid}")
      expect(page).to have_content("Access Denied")
    end
  end
end
