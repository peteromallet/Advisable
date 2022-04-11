# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Discover", type: :system do
  let(:account) { create(:account, permissions: ["team_manager"]) }
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
    it "lists the users shortlists and they can click into one" do
      search = create(:case_study_interest, term: "Test shortlist", account:, article_ids: [article1.id])
      authenticate_as(user)
      visit("/explore")
      expect(page).to have_content("Test shortlist")
      click_link("Test shortlist")
      expect(page).to have_current_path("/explore/#{search.uid}")
    end

    context "when user has no shortlists" do
      it "shows an empty state to create a shortlist" do
        interest.destroy
        authenticate_as(user)
        visit("/explore")
        expect(page).to have_content("You haven't created any shortlists")
      end
    end
  end

  describe "shortlist view" do
    it "user can click in to view a case study and back again" do
      authenticate_as(user)
      visit("/explore/#{interest.uid}")
      find("*[data-testid=title]", text: article1.title).click
      expect(page).to have_current_path("/explore/#{interest.uid}/#{article1.uid}")
      click_link("Back")
      expect(page).to have_current_path("/explore/#{interest.uid}")
    end
  end

  context "when trying to view a search they dont have access to" do
    it "shows a 404 error" do
      interest = create(:case_study_interest)
      authenticate_as(user)
      visit("/explore/#{interest.uid}")
      expect(page).to have_content("404")
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
