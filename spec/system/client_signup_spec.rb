# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Client signup", type: :system do
  before do
    allow_any_instance_of(User).to receive(:sync_to_airtable)
    create(:industry, name: "Financial Services")
    create(:industry, name: "Development")
    create(:industry, name: "Design")
    create(:skill, name: "Linkedin Advertising")
    create(:skill, name: "Facebook Advertising")
    create(:skill, name: "Twitter Advertising")
  end

  it "Client can create an account and gets redirected to projects" do
    Sidekiq::Testing.inline! do
      visit("/join")
      expect(page).to have_content("What kind of account do you want to create?")
      click_on("Client account")
      fill_in("firstName", with: "Michael")
      fill_in("lastName", with: "Scott")
      fill_in("email", with: "michael+scott@dundermifflin.com")
      fill_in("password", with: "testing123")
      fill_in("passwordConfirmation", with: "testing123")
      click_on("Create Your Free Account")

      # Company step
      expect(page).to have_content("Tell us about your company")
      fill_in("name", with: "Dunder Mifflin")
      click_on("Continue")

      # Industry step
      find("*[data-testid=industry]", text: "Development").click

      # Customer
      fill_in("audience", with: "I'm looking for a developer")
      click_on("Continue")

      # hiring
      find_by_test_id("hire").click

      # Interests
      first(:button, "Creative PR Strategy").click
      first(:button, "Improve SEO Rankings").click
      click_on("Continue")

      expect(page).to have_content("Setting up your feed")
      CaseStudy::Interest.all.each do |interest|
        create(:case_study_interest_article, interest:)
      end
      # We have an intentional 5 second delay on the 'setting up your feed' step.
      sleep(6)
      expect(page).to have_current_path("/")
    end
  end
end
