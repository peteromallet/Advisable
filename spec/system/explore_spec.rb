# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Discover", type: :system do
  let(:account) { create(:account, permissions: ["team_manager"], completed_tutorials: ["onboarding"]) }
  let(:user) { create(:user, account:) }
  let(:article1) { create(:case_study_article, title: "Article One", score: 100) }
  let(:article2) { create(:case_study_article, title: "Article Two", score: 90) }
  let(:article3) { create(:case_study_article, title: "Article Three", score: 90) }
  let!(:interest) do
    create(:case_study_interest, {
      term: "Test list",
      account:,
      article_ids: [article1.id, article2.id]
    })
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
      interest = create(:case_study_interest, term: "SEO", account:, article_ids: [article1.id])
      authenticate_as(user)
      visit("/explore")
      expect(page).to have_content("SEO")
      click_link("SEO")
      expect(page).to have_current_path("/explore/#{interest.uid}")
    end
  end

  context "when trying to view an interest they dont have access to" do
    it "shows a 404 error" do
      interest = create(:case_study_interest)
      authenticate_as(user)
      visit("/explore/#{interest.uid}")
      expect(page).to have_content("Not Found")
    end
  end

  context "when the user is not onboarded" do
    it "redirects to onboarding" do
      user.account.update(completed_tutorials: [])
      authenticate_as(user)
      visit("/explore")
      expect(page).to have_content("Let's build your feed")
      expect(page).to have_current_path("/setup")
    end
  end
end
