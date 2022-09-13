# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Freelancer dashboard", type: :system do
  let(:account) { create(:account) }
  let(:application_stage) { "Accepted" }
  let(:specialist) { create(:specialist, application_stage:, account:) }
  let!(:article) { create(:case_study_article, published_at: 1.hour.ago, title: "Article title") }
  let!(:post) { create(:guild_post, pinned: true, specialist:) }
  let!(:event) { create(:event, title: "Big event") }

  it "displays posts, events and articles" do
    authenticate_as(specialist)
    visit("/collaborate")
    expect(page).to have_content(post.title)
    expect(page).to have_content(event.title)
    expect(page).to have_content(article.title)
  end

  context "when dashboard data is empty" do
    let(:event) { nil }
    let(:article) { nil }

    it "displays empty state of latest projects and upcoming events" do
      authenticate_as(specialist)
      visit("/")
      expect(page).to have_content("There are no upcoming Events")
      expect(page).to have_content("No Case Studies have been created recently")
    end
  end

  context "when application_stage is 'Started'" do
    let(:application_stage) { "Started" }

    it "prompts user to start their application to advisable" do
      authenticate_as(specialist)
      visit("/")
      expect(page).to have_content("Join our freelance network")
      click_on("Start Application")
      expect(page).to have_content("Welcome to Advisable")
    end
  end

  context "when application_stage is 'Submitted'" do
    let(:application_stage) { "Submitted" }

    it "informs user we are reviewing their application" do
      authenticate_as(specialist)
      visit("/")
      expect(page).to have_content("We are reviewing your application")
    end
  end

  context "when application_stage is 'Invited To Interview'" do
    let(:application_stage) { "Invited To Interview" }

    it "prompts the user to build a case study" do
      authenticate_as(specialist)
      visit("/")
      expect(page).to have_content("Invited to the next step")
    end
  end

  context "when application_stage is 'Interview Scheduled'" do
    let(:application_stage) { "Interview Scheduled" }

    it "prompts the user the call was scheduled" do
      authenticate_as(specialist)
      visit("/")
      expect(page).to have_content("Call Scheduled")
    end
  end

  context "when application_stage is 'Interview Completed'" do
    let(:application_stage) { "Interview Completed" }

    it "prompts the user that case study submitted" do
      authenticate_as(specialist)
      visit("/")
      expect(page).to have_content("Case study submitted")
    end
  end

  context "when email is not confimed" do
    let(:account) { create(:account, confirmed_at: nil) }

    it "prompts the user to confirm an email" do
      authenticate_as(specialist)
      visit("/collaborate")
      expect(page).to have_content("Please confirm your account")
    end
  end
end
