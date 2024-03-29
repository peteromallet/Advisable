# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Freelancer signup", type: :system do
  before do
    allow_any_instance_of(Specialist).to receive(:sync_to_airtable)
    create(:country, name: "Ireland", alpha2: "IE")
    create(:country, name: "United Kingdom", alpha2: "UK")
    create(:industry, name: "Financial Services")
    create(:industry, name: "Development")
    create(:industry, name: "Design")
    create(:skill, name: "Linkedin Advertising")
    create(:skill, name: "Facebook Advertising")
    create(:skill, name: "Twitter Advertising")
  end

  it "Specialist can create an account and gets redirected to application" do
    visit("/join")
    expect(page).to have_content("Are you a full-time employee or freelancer?")
    click_on("Freelancer")
    fill_in("firstName", with: "Dwight")
    fill_in("lastName", with: "Schrute")
    fill_in("email", with: "dwight@theoffice.com")
    fill_in("password", with: "testing123")
    fill_in("passwordConfirmation", with: "testing123")
    click_on("Create Your Free Account")

    first(:button, "Creative PR Strategy").click
    first(:button, "Improve SEO Rankings").click
    click_on("Continue")
    expect(page).to have_content("Setting up your feed")
    # We have an intentional 5 second delay on the 'setting up your feed' step.
    sleep(6)

    first(:button, "Share your work").click
    expect(page).to have_content(/join our network/i)
    first(:button, "Get Featured").click

    expect(page).to have_content("Welcome to Advisable")
    click_on("Get Started")

    expect(page).to have_content("Introduction")
    attach_file(
      "upload-avatar",
      Rails.root.join("spec/support/01.jpg"),
      make_visible: true
    )
    fill_in("bio", with: "This is my bio")
    fill_in("city", with: "Dublin")
    select("United Kingdom", from: "country")
    click_on("Continue")

    expect(page).to have_content("Overview")

    fill_in("linkedin", with: "https://www.linkedin.com/in/dwight-schrute/")
    fill_in("website", with: "https://dwightschrute.com")
    click_on("Continue")

    expect(page).to have_content("Previous work")

    fill_in("previousWorkDescription", with: "Litora inceptos varius")
    fill_in("previousWorkResults", with: "Per dignissim primis")
    click_on("Continue")

    expect(page).to have_content("Work preferences")

    skills = find_field("skills")
    skills.send_keys("face", :down, :enter)
    skills.send_keys("twit", :down, :enter)
    industries = find_field("industries")
    industries.send_keys("fin", :down, :enter)
    industries.send_keys("deve", :down, :enter)
    choose "Full-time freelancer", allow_label_click: true
    click_on "Continue"

    expect(page).to have_content("Ideal project")

    fill_in("idealProject", with: "Mauris tortor posuere")
    click_on "Submit"

    expect(page).to have_content("We are reviewing your application")
  end
end
