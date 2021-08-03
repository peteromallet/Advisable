# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Explore', type: :system do
  let(:account) { create(:account, permissions: ["team_manager"], features: {"case_studies" => true}) }
  let(:user) { create(:user, account: account) }
  let(:article1) { create(:case_study_article, score: 100) }
  let(:article2) { create(:case_study_article, score: 90) }

  let!(:company_search) do
    create(:case_study_search, {
      company_recomendation: true,
      user: user,
      finalized_at: Time.zone.now,
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

  it '/explore redirects to the company search and shows the results' do
    authenticate_as(user)
    visit '/explore'
    expect(page).to have_content(article1.title)
    expect(page).to have_content(article2.title)
    expect(page).to have_current_path("/explore/#{company_search.uid}")
  end

  it 'user can favorite an article from the index view' do
    authenticate_as(user)
    expect(user.reload.saved_articles).to be_empty
    visit "/explore/#{company_search.uid}"
    first("button", text: "Favorite").click
    click_link("Favorites")
    expect(page).to have_content(article1.title)
    expect(page).to have_content("Favorited")
    expect(user.reload.saved_articles).not_to be_empty
  end

  it 'user can archive an article from the index view' do
    authenticate_as(user)
    expect(user.reload.archived_articles).to be_empty
    visit "/explore/#{company_search.uid}"
    expect(page).to have_content(article1.title)
    first("button", text: "Archive").click
    find("label", text: "Just doesn't seem like a good fit").click
    within("*[role='dialog']") do
      click_on("Archive")
    end
    click_link("Archive")
    expect(page).to have_content(article1.title)
    expect(user.reload.archived_articles).not_to be_empty
  end

  it 'user can share an article from the index view' do
    allow_any_instance_of(User).to receive(:sync_to_airtable)
    authenticate_as(user)
    expect(user.reload.archived_articles).to be_empty
    visit "/explore/#{company_search.uid}"
    expect(page).to have_content(article1.title)
    first("button", text: "Share").click
    within("*[role='dialog']") do
      fill_in("firstName", with: Faker::Name.first_name)
      fill_in("lastName", with: Faker::Name.last_name)
      fill_in("email", with: "test@#{user.account.domain}")
      click_on("Share")
    end
    expect(page).to have_content("We have sent an invite")
  end

  it 'user can see articles that have been shared with them' do
    authenticate_as(user)
    create(:case_study_shared_article, shared_with: user, shared_by: create(:user), article: article1)
    create(:case_study_shared_article, shared_with: user, shared_by: create(:user), article: article2)
    visit("/explore/shared")
    expect(page).to have_content(article1.title)
    expect(page).to have_content(article2.title)
  end

  it 'user can invite a team member from index view' do
    allow_any_instance_of(User).to receive(:sync_to_airtable)
    authenticate_as(user)
    visit("/explore")
    click_on("Invite team member")
    within("*[role='dialog']") do
      fill_in("firstName", with: Faker::Name.first_name)
      fill_in("lastName", with: Faker::Name.last_name)
      fill_in("email", with: "test@#{user.account.domain}")
      click_on("Share")
    end
    expect(page).to have_content("We have sent an invite")
  end

  it 'user can click in to view a case study and back again' do
    authenticate_as(user)
    visit("/explore/#{company_search.uid}")
    click_link(article1.title)
    expect(page).to have_content(article1.subtitle)
    expect(page).to have_current_path("/explore/articles/#{article1.uid}?back=/explore/#{company_search.uid}&search=#{company_search.uid}")
    click_button("Go back")
    expect(page).to have_current_path("/explore/#{company_search.uid}")
  end

  it 'user can favorite an article from the article view' do
    authenticate_as(user)
    expect(user.reload.saved_articles).to be_empty
    visit "/explore/articles/#{article1.uid}"
    expect(page).to have_content(article1.title)
    click_on("Favorite")
    click_on("Go back")
    click_link("Favorites")
    expect(page).to have_content(article1.title)
    expect(user.reload.saved_articles).not_to be_empty
  end

  it 'user can archive an article from the article view' do
    authenticate_as(user)
    expect(user.reload.archived_articles).to be_empty
    visit "/explore/articles/#{article1.uid}?search=#{company_search.uid}"
    expect(page).to have_content(article1.title)
    click_button("Archive")
    within("*[role='dialog']") do
      find("label", text: "Just doesn't seem like a good fit").click
      click_on("Archive")
    end
    expect(page).to have_content("Unarchive")
    click_on("Go back")
    click_link("Archive")
    expect(page).to have_content(article1.title)
    expect(user.reload.archived_articles).not_to be_empty
  end

  it 'user can share an article from the article view' do
    allow_any_instance_of(User).to receive(:sync_to_airtable)
    authenticate_as(user)
    visit "/explore/articles/#{article1.uid}"
    expect(page).to have_content(article1.title)
    click_on("Share")
    within("*[role='dialog']") do
      fill_in("firstName", with: Faker::Name.first_name)
      fill_in("lastName", with: Faker::Name.last_name)
      fill_in("email", with: "test@#{user.account.domain}")
      click_on("Share")
    end
    expect(page).to have_content("We have sent an invite")
  end

  it 'user can create a new search' do
    twitter_ads = create(:skill, name: "Twitter Ads")
    facebook_ads = create(:skill, name: "Facebook Ads")
    create(:case_study_skill, article: article1, skill: twitter_ads)
    create(:case_study_skill, article: article1, skill: facebook_ads)

    authenticate_as(user)
    visit '/explore'
    click_on("Create a new search")
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
    click_on("Search for Case Studies")
    # Results
    expect(page).to have_content(article1.title)
    expect(page).not_to have_content(article2.title)
  end

  it 'user can edit a search' do
    twitter_ads = create(:skill, name: "Twitter Ads")
    facebook_ads = create(:skill, name: "Facebook Ads")
    create(:case_study_skill, article: article1, skill: twitter_ads)
    create(:case_study_skill, article: article1, skill: facebook_ads)

    search = create(:case_study_search, {
      user: user,
      finalized_at: Time.zone.now,
      results: []
    })

    authenticate_as(user)
    visit "/explore/#{search.uid}"
    click_on("Edit search")
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
    click_on("Search for Case Studies")
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
    expect(user.reload.searches.count).to eq(2)
    visit "/explore/#{search.uid}"
    click_on("Delete search")
    within("*[role='dialog']") do
      click_on("Delete")
    end
    expect(page).to have_content(article1.title)
    expect(page).to have_current_path("/explore/#{company_search.uid}")
    expect(user.reload.searches.count).to eq(1)
  end
end
