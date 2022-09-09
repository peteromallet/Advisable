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

  let(:articles) do
    Array.new(20) do |i|
      create(:case_study_article, :with_content, score: 100 - i)
    end
  end

  before do
    allow_any_instance_of(CaseStudy::TermData).to receive(:articles_for_interest).and_return([])
    allow_any_instance_of(CaseStudy::Article).to receive(:similar).and_return([])
  end

  it "feed shows results and loads more results on scroll" do
    interest = create(:case_study_interest, account: user.account)
    articles.each do |article|
      create(:case_study_interest_article, interest:, article:)
    end

    authenticate_as(user)
    visit("/")
    expect(page).to have_content(articles.first.title)
    expect(page).not_to have_content(articles.last.title)
    scroll_to(:bottom)
    expect(page).to have_selector("*[data-testid=casestudy-card-skeleton]")
    expect(page).to have_content(articles.last.title)
    click_link(articles.last.title)
    expect(page).to have_content(articles.last.subtitle)
    expect(page).to have_content(articles.last.contents.by_position.first.content["text"])
  end

  it "shows the results for a topic and loads more on scroll" do
    create(:case_study_topic, slug: "seo")
    allow_any_instance_of(CaseStudy::Topic).to receive(:results).and_return(articles)
    authenticate_as(user)
    visit("/topics/seo")
    expect(page).to have_content(articles.first.title)
    expect(page).not_to have_content(articles.last.title)
    scroll_to(:bottom)
    expect(page).to have_selector("*[data-testid=casestudy-card-skeleton]")
    expect(page).to have_content(articles.last.title)
    click_link(articles.last.title)
    expect(page).to have_content(articles.last.subtitle)
    expect(page).to have_content(articles.last.contents.by_position.first.content["text"])
  end

  it "allows user to search from anywhere via header search" do
    article = create(:case_study_article, :with_content, title: "How to sell paper")
    allow_any_instance_of(CaseStudy::InterestPreview).to receive(:results).and_return([article])
    authenticate_as(user)
    visit("/")
    input = find_field("headerSearch")
    input.send_keys("headerSearch", :enter)
    expect(page).to have_content(article.title)
    click_link(article.title)
    expect(page).to have_content(article.contents.by_position.first.content["text"])
  end

  it "allows user to remove interests" do
    design = create(:case_study_interest, term: "Design", account:)
    expect(account.reload.interests).to include(design)
    authenticate_as(user)
    visit("/")
    click_on("Customize")
    click_on("Remove Design", match: :first)
    click_on("Save")
    expect(page).to have_selector("*[data-testid=casestudy-card-skeleton]")
    expect(account.reload.interests).not_to include(design)
  end

  it "allows user to add new interests" do
    expect(account.reload.interests.map(&:term)).not_to include("Design")
    expect(account.reload.interests.map(&:term)).not_to include("Creative PR Strategy")
    authenticate_as(user)
    visit("/")
    click_on("Customize")
    find_field("interest").send_keys("Design", :enter)
    click_on("Add Creative PR Strategy") # test adding from list of suggestions
    click_on("Save")
    expect(page).to have_selector("*[data-testid=casestudy-card-skeleton]")
    expect(account.reload.interests.map(&:term)).to include("Design")
    expect(account.reload.interests.map(&:term)).to include("Creative PR Strategy")
  end

  context "when logged in as specialist" do
    it "/ redirects to dashboard on / path" do
      authenticate_as(create(:specialist, application_stage: "Accepted"))
      visit "/"
      expect(page).to have_content("Collaboration requests")
    end
  end

  context "when not logged in" do
    it "shows the home page and prompts them to signup" do
      create(:case_study_topic, name: "Home", hidden: true, result_ids: articles.map(&:id))
      visit("/")
      expect(page).to have_content(/discover the growth/i)
      expect(page).to have_content(articles.first.title)
      click_link(articles.first.title)
      expect(page).to have_content(/explore 100s of full case studies for free/i)
      click_button("Get Free Access")
      expect(page).to have_current_path("/join")
    end
  end

  describe "/" do
    it "Lists topics and they can click into one" do
      create(:case_study_topic, name: "SEO", slug: "seo")
      authenticate_as(user)
      visit("/")
      expect(page).to have_content("SEO")
      click_link("SEO", match: :first)
      expect(page).to have_current_path("/topics/seo")
    end
  end

  context "when the user is not onboarded" do
    it "redirects to onboarding" do
      user.account.update(completed_tutorials: [])
      authenticate_as(user)
      visit("/")
      expect(page).to have_content("Tell us about your company")
      expect(page).to have_current_path("/setup/company")
    end
  end
end
