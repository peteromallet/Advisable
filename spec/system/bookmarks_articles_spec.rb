# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Favorites", type: :system do
  let(:account) { create(:account, permissions: ["team_manager"], completed_tutorials: %w[onboarding feed]) }
  let(:user) { create(:user, account:) }
  let(:article1) { create(:case_study_article, title: "Article One", score: 100) }
  let(:article2) { create(:case_study_article, title: "Article Two", score: 90) }

  before do
    similar = create(:case_study_article)
    allow_any_instance_of(::CaseStudy::Article).to receive(:similar).and_return([similar])

    create(:case_study_interest, {
      account:,
      article_ids: [article1.id, article2.id]
    })
  end

  it "bookmarks empty state" do
    authenticate_as(user)
    visit "/explore/favorites"
    expect(page).to have_content("You haven't favorited any projecs yet.")
  end

  it "add article to favorites via article page" do
    authenticate_as(user)
    visit "/explore"
    expect(page).to have_content(article1.title)
    click_on(article1.title)
    expect(page).to have_current_path("/articles/#{article1.slug}")
    specialist_bar = find_by_test_id("specialistBar")
    within(specialist_bar) do
      find_by_label("Add to Bookmarks").click
    end
    expect(page).to have_content("Added to bookmarks")
    click_button("Close modal")
    click_link("Your Favorites")
    expect(page).to have_current_path("/explore/favorites")
    expect(page).to have_content(article1.title)
  end

  it "remove article from favorites via article page" do
    create(:case_study_favorited_article, article: article1, account: user.account)
    authenticate_as(user)
    visit "/explore/favorites"
    expect(page).to have_content(article1.title)
    click_on(article1.title)
    expect(page).to have_current_path("/articles/#{article1.slug}")
    specialist_bar = find_by_test_id("specialistBar")
    within(specialist_bar) do
      click_button("Remove from Bookmarks")
    end
    expect(page).to have_content("Removed from bookmarks")
    click_button("Close modal")
    expect(page).not_to have_content(article1.title)
  end

  it "add article to favorites via feed list" do
    authenticate_as(user)
    visit "/explore"
    expect(page).to have_content(article1.title)
    page.find_button("Favorite this project", match: :first).click
    click_on("Your Favorites")
    expect(page).to have_current_path("/explore/favorites")
    expect(page).to have_content(article1.title)
  end

  it "remove article from favorites via feed list" do
    create(:case_study_favorited_article, article: article1, account: user.account)
    favorited = user.reload.account.favorited_articles.map(&:article)
    expect(favorited).to include(article1)
    authenticate_as(user)
    visit "/explore"
    expect(page).to have_content(article1.title)
    card = find_by_test_id("article-card-#{article1.uid}")
    within(card) do
      click_button("Remove from favorites")
    end
    click_on("Your Favorites")
    expect(page).to have_current_path("/explore/favorites")
    expect(page).not_to have_content(article1.title)
    favorited = user.reload.account.favorited_articles.map(&:article)
    expect(favorited).not_to include(article1)
  end

  it "remove article from favorites via favorites list" do
    create(:case_study_favorited_article, article: article1, account: user.account)
    authenticate_as(user)
    visit "/explore/favorites"
    expect(page).to have_content(article1.title)
    click_button("Remove from favorites")
    expect(page).not_to have_content(article1.title)
  end
end
