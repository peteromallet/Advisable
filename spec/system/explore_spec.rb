# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Discover", type: :system do
  let(:account) { create(:account, permissions: ["team_manager"], completed_tutorials: %w[onboarding feed]) }
  let(:user) { create(:user, account:) }
  let(:article1) { create(:case_study_article, title: "Article One", score: 100) }
  let(:article2) { create(:case_study_article, title: "Article Two", score: 90) }
  let(:article3) { create(:case_study_article, title: "Article Three", score: 90) }
  let(:interest) do
    create(:case_study_interest, {
      term: "Test list",
      account:,
      article_ids: [article1.id, article2.id]
    })
  end

  before do
    allow_any_instance_of(CaseStudy::TermData).to receive(:articles_for_interest).and_return([])
  end

  context "when not authenticated" do
    it "/explore redirects to the login page" do
      visit "/explore"
      expect(page).to have_content("Please sign in to your account")
    end
  end

  context "when logged in as specialist" do
    it "/explore redirects to dashboard on / path" do
      authenticate_as(create(:specialist, application_stage: "Accepted"))
      visit "/explore"
      expect(page).to have_content("Collaboration requests")
    end
  end

  describe "/explore" do
    it "lists the users interests and they can click into one" do
      an_interest = create(:case_study_interest, term: "SEO", account:, article_ids: [article1.id])
      authenticate_as(user)
      visit("/explore")
      expect(page).to have_content("SEO")
      click_link("SEO", match: :first)
      expect(page).to have_current_path("/explore/#{an_interest.uid}")
    end
  end

  context "when trying to view an interest they dont have access to" do
    it "shows a 404 error" do
      an_interest = create(:case_study_interest)
      authenticate_as(user)
      visit("/explore/#{an_interest.uid}")
      expect(page).to have_content("Not Found")
    end
  end

  context "when the user is not onboarded" do
    it "redirects to onboarding" do
      user.account.update(completed_tutorials: [])
      authenticate_as(user)
      visit("/explore")
      expect(page).to have_content("Tell us about your company")
      expect(page).to have_current_path("/setup/company")
    end
  end

  it "feed shows results and loads more results on scroll" do
    interest = create(:case_study_interest, account: user.account)
    articles = create_list(:case_study_article, 20)
    articles.each do |article|
      create(:case_study_interest_article, interest:, article:)
    end
    authenticate_as(user)
    visit("/explore")
    trending = CaseStudy::Article.published.trending
    expect(page).to have_content(trending.first.title)
    expect(page).not_to have_content(trending.last.title)
    scroll_to(:bottom)
    expect(page).to have_selector("*[data-testid=feed-item-skeleton]")
    expect(page).to have_content(trending.last.title)
  end

  it "shows the results for an interest and loads more on scroll" do
    interest = create(:case_study_interest, account: user.account)
    articles = create_list(:case_study_article, 20)
    articles.each do |article|
      create(:case_study_interest_article, interest:, article:)
    end

    authenticate_as(user)
    visit("/explore/#{interest.uid}")
    trending = interest.articles.published.trending
    expect(page).to have_content(trending.first.title)
    expect(page).not_to have_content(trending.last.title)
    scroll_to(:bottom)
    expect(page).to have_selector("*[data-testid=feed-item-skeleton]")
    expect(page).to have_content(trending.last.title)
  end

  it "allows user to remove an interest" do
    interest = create(:case_study_interest, account: user.account)
    authenticate_as(user)
    visit("/explore/#{interest.uid}")
    click_button("Remove interest")
    expect(page).to have_content(/are you sure?/i)
    click_button("Remove")
    expect(page).to have_content("Your feed")
    expect(user.reload.account.interests.map(&:term)).not_to include(interest.term)
  end

  it "allows user to search for a new interest, add it and then remove it" do
    article = create(:case_study_article, title: "How to sell paper")
    allow_any_instance_of(CaseStudy::InterestPreview).to receive(:results).and_return([article])
    authenticate_as(user)
    visit("/explore/search")
    fill_in("search", with: "Selling paper")
    click_button("Search")
    expect(page).to have_content(article.title)
    click_button("Add to interests")
    expect(page).to have_content("Added")
    expect(user.reload.account.interests.map(&:term)).to include("Selling paper")
    click_button("Added")
    expect(page).to have_content("Add to interests")
    expect(user.reload.account.interests.map(&:term)).not_to include("Selling paper")
  end

  it "allows user to search from anywhere via header search" do
    article = create(:case_study_article, title: "How to sell paper")
    allow_any_instance_of(CaseStudy::InterestPreview).to receive(:results).and_return([article])
    authenticate_as(user)
    visit("/explore")
    input = find_field("headerSearch")
    input.send_keys("headerSearch", :enter)
    expect(page).to have_content(article.title)
  end

  it "shows an empty state when search has no results" do
    allow_any_instance_of(CaseStudy::InterestPreview).to receive(:results).and_return([])
    authenticate_as(user)
    visit("/explore/search")
    fill_in("search", with: "Selling paper")
    click_button("Search")
    expect(page).to have_content(/No matches/i)
    click_button("New search")
    expect(page).to have_content("Discover new projects")
  end

  it "brings the user through a walkthrough" do
    user.account.update(completed_tutorials: ["onboarding"])
    authenticate_as(user)
    visit("/explore")
    expect(page).to have_content("Welcome to Advisable")
    click_on("Next")
    expect(page).to have_content(/relevant to the topics that you follow./i)
    click_on("Next")
    expect(page).to have_content(/Explore the projects you like/i)
    click_on("Next")
    expect(page).to have_content(/Reach out to the people behind them/i)
    click_on("Next")
    expect(page).to have_content(/You can click into each one to see only projects related to that topic./i)
    click_on("Next")
    expect(page).to have_content(/search for more/i)
    click_on("Next")
    expect(page).to have_content(/ready to start exploring projects/i)
    click_on("Let's go")
    wait_until do
      expect(user.reload.account.completed_tutorials).to include("feed")
    end
  end
end
