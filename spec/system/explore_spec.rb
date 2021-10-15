# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Discover', type: :system do
  let(:account) { create(:account, permissions: ["team_manager"]) }
  let(:user) { create(:user, account: account) }
  let(:article1) { create(:case_study_article, title: "Article One", score: 100) }
  let(:article2) { create(:case_study_article, title: "Article Two", score: 90) }
  let(:article3) { create(:case_study_article, title: "Article Three", score: 90) }
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
    branding = create(:skill_category, name: "Branding")
    brand_marketing = create(:skill, name: "Brand Marketing")
    brand_strategy = create(:skill, name: "Brand Strategy")
    brand_marketing.skill_categories << branding
    brand_strategy.skill_categories << branding

    [article1, article2, article3].each do |article|
      create(:case_study_skill, article: article, skill: [brand_marketing, brand_strategy].sample)
    end

    authenticate_as(user)
    visit '/explore'
    click_on("New Shortlist")
    # Skills
    click_on("Branding")
    # Article selection
    first("[data-testid='articleTitle']", text: "Article One").click
    first("[data-testid='articleTitle']", text: "Article Two").click
    expect(page).to have_button('Continue', disabled: true)
    first("[data-testid='articleTitle']", text: "Article Three").click
    click_on("Continue")
    # Goals
    find("label", text: "Increase Web Traffic").click
    find("label", text: "Rebranding").click
    find("label", text: "Improve Process").click
    click_on("Continue")
    # Name
    fill_in("name", with: "My shortlist")
    click_on("Create shortlist")
    # Results
    expect(page).to have_content(article1.title)
    expect(page).to have_content(article2.title)
    expect(page).to have_content(article3.title)
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
