# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Request consultation" do
  let(:freelancer) { create(:specialist) }
  let(:user) { create(:user) }

  before do
    allow_any_instance_of(Project).to receive(:sync_to_airtable)
    create(:case_study_article, :with_skills, specialist: freelancer)
  end

  def complete_request_consultation_flow
    monday = Date.parse("monday")
    delta = monday > Time.zone.now ? 0 : 7
    next_monday = monday + delta
    find("[aria-label='#{next_monday.strftime('%-d %b %Y, 09:00')}']").click
    find("[aria-label='#{next_monday.strftime('%-d %b %Y, 09:30')}']").click
    find("[aria-label='#{next_monday.strftime('%-d %b %Y, 10:00')}']").click
    find("[aria-label='#{next_monday.strftime('%-d %b %Y, 10:30')}']").click
    find("[aria-label='#{next_monday.strftime('%-d %b %Y, 11:00')}']").click
    find("[aria-label='#{next_monday.strftime('%-d %b %Y, 11:30')}']").click
    click_on("Continue")
    fill_in("message", with: "Hey there!")
    click_on("Send Request")
    expect(page).to have_content("We have sent your request")
  end

  it "Allows user to request consultation with a freelancer" do
    authenticate_as(user)
    visit("/profile/#{freelancer.uid}")
    click_on("Work together")
    complete_request_consultation_flow
  end

  context "when a user is not logged in" do
    it "they can signup as a client and request a consultation" do
      allow_any_instance_of(User).to receive(:sync_to_airtable)
      visit("/profile/#{freelancer.uid}")
      click_on("Work together")
      click_on("Signup as a company")
      fill_in("firstName", with: "Michael")
      fill_in("lastName", with: "Scott")
      fill_in("email", with: "michael.scott@dundermifflin.com")
      fill_in("password", with: "password")
      fill_in("passwordConfirmation", with: "password")
      click_on("Create account")
      complete_request_consultation_flow
    end

    it "they can login to their existing account and request a consultation" do
      visit("/profile/#{freelancer.uid}")
      click_on("Work together")
      within("*[role='dialog']") do
        click_on("Login")
      end
      fill_in("email", with: user.account.email)
      fill_in("password", with: "testing123")
      within("*[role='dialog']") do
        click_on("Login")
      end
      complete_request_consultation_flow
    end

    it "they can signup as a freelancer and send a message" do
      allow_any_instance_of(Specialist).to receive(:sync_to_airtable)
      visit("/profile/#{freelancer.uid}")
      click_on("Work together")
      click_on("Signup as a freelancer")
      fill_in("firstName", with: "Michael")
      fill_in("lastName", with: "Scott")
      fill_in("email", with: "michael.scott@dundermifflin.com")
      fill_in("password", with: "password")
      fill_in("passwordConfirmation", with: "password")
      click_on("Create account")
      fill_in("content", with: "Helloooo")
      click_on("Send Message")
      expect(page).to have_content("We have sent your message")
    end

    it "they can login as a freelancer and send a message" do
      other_freelancer = create(:specialist)
      visit("/profile/#{freelancer.uid}")
      click_on("Work together")
      within("*[role='dialog']") do
        click_on("Login")
      end
      fill_in("email", with: other_freelancer.account.email)
      fill_in("password", with: "testing123")
      within("*[role='dialog']") do
        click_on("Login")
      end
      fill_in("content", with: "Helloooo")
      click_on("Send Message")
      expect(page).to have_content("We have sent your message")
    end
  end
end
