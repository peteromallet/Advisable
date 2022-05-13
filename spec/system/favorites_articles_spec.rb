# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Favorites", type: :system do
  let(:account) { create(:account, permissions: ["team_manager"], completed_tutorials: %w[onboarding feed]) }
  let(:user) { create(:user, account:) }
  let(:article1) { create(:case_study_article, title: "Article One", score: 100) }
  let(:article2) { create(:case_study_article, title: "Article Two", score: 90) }
  let(:favorited_article) { create(:case_study_favorited_article, article: article1, account: user.account) }
  let!(:interest) do
    create(:case_study_interest, {
      term: "Test list",
      account:,
      article_ids: [article1.id, article2.id]
    })
  end

  before do
    similar = create(:case_study_article)
    allow_any_instance_of(::CaseStudy::Article).to receive(:similar).and_return([similar])
  end

  it "favorites empty state" do
    authenticate_as(user)
    visit "/explore/favorites"
    expect(page).to have_content("You have no favorite case studies yet.")
  end

  it "add article to favorites via article page" do
    authenticate_as(user)
    visit "/explore"
    expect(page).to have_content(article1.title)
    click_on(article1.title)
    expect(page).to have_current_path("/articles/#{article1.slug}")
    click_button("Add to Favorites")
    expect(page).to have_content("Added to favorites")
    click_button("Go back")
    expect(page).to have_content("Your feed")
    click_on("Favorites")
    expect(page).to have_content("Favorites")
    expect(page).to have_current_path("/explore/favorites")
    expect(page).to have_content(article1.title)
  end

  it "remove article from favorites via article page" do
    user.account.update(favorited_articles: [favorited_article])
    authenticate_as(user)
    visit "/explore/favorites"
    expect(page).to have_content(article1.title)
    click_on(article1.title)
    expect(page).to have_current_path("/articles/#{article1.slug}")
    expect(page).to have_content(article1.title)
    click_button("Remove from Favorites")
    expect(page).to have_content("Removed from favorites")
    click_button("Go back")
    expect(page).not_to have_content(article1.title)
  end

  it "add article to favorites via feed list" do
    authenticate_as(user)
    visit "/explore"
    expect(page).to have_content(article1.title)
    first("*[data-testid='feed-item']").hover
    click_button("Add to Favorites")
    expect(page).to have_content("Added to favorites")
    click_on("Favorites")
    expect(page).to have_content("Favorites")
    expect(page).to have_current_path("/explore/favorites")
    expect(page).to have_content(article1.title)
  end

  it "remove article from favorites via feed list" do
    user.account.update(favorited_articles: [favorited_article])
    authenticate_as(user)
    visit "/explore"
    expect(page).to have_content(article1.title)
    click_button("Remove from Favorites")
    expect(page).to have_content("Removed from favorites")
    click_on("Favorites")
    expect(page).to have_content("Favorites")
    expect(page).to have_current_path("/explore/favorites")
    expect(page).not_to have_content(article1.title)
  end

  it "remove article from favorites via favorites list" do
    user.account.update(favorited_articles: [favorited_article])
    authenticate_as(user)
    visit "/explore/favorites"
    expect(page).to have_content(article1.title)
    click_button("Remove from Favorites")
    expect(page).to have_content("Removed from favorites")
    expect(page).not_to have_content(article1.title)
  end
end
