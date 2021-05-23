# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Client signup', type: :system do
  before do
    allow_any_instance_of(User).to receive(:sync_to_airtable)
    create(:industry, name: "Financial Services")
    create(:industry, name: "Development")
    create(:industry, name: "Design")
    create(:skill, name: "Linkedin Advertising")
    create(:skill, name: "Facebook Advertising")
    create(:skill, name: "Twitter Advertising")
  end

  it 'Client can create an account and gets redirected to projects' do
    visit("/clients/join")
    fill_in("firstName", with: "Michael")
    fill_in("lastName", with: "Scott")
    fill_in("email", with: "michael+scott@dundermifflin.com")
    click_on("Get Started")
    fill_in("password", with: "testing123")
    fill_in("passwordConfirmation", with: "testing123")
    click_on("Get Started")

    expect(page).to have_content("Welcome to Advisable")
    click_on("Get Started")

    expect(page).to have_content("Company Overview")
    fill_in("companyName", with: "Dunder Mifflin")
    find("button[aria-label='B2B']").click
    industry = find_field("Select your company industry")
    industry.send_keys("des", :down, :return)
    click_on("Continue")

    expect(page).to have_content("Company Stage")
    find("button[aria-label='Small Business']").click

    expect(page).to have_content("Goals")
    find('label', text: 'Increase Web Traffic').click
    find('label', text: 'Improve Conversion').click
    click_on("Continue")

    expect(page).to have_content("Preferences")
    fill_in("title", with: "CEO")
    fill_in("budget", with: "10000")
    find("button[aria-label='Yes']").click
    find('label', text: 'We rarely experiment & try new things').click
    click_on("Continue")

    expect(page).to have_content('We are reviewing your application')
  end
end
