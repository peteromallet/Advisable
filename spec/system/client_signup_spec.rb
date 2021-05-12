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

  it 'allows the user to signup as a client' do
    visit("/clients/signup")
    fill_in("firstName", with: "Michael")
    fill_in("lastName", with: "Scott")
    fill_in("email", with: "michael+scott@dundermifflin.com")
    click_on("Continue")

    fill_in("companyName", with: "Dunder Mifflin")
    industry = find_field("Select your company industry")
    industry.send_keys("des", :down, :return)
    select("Startup", from: "companyType")
    click_on("Continue")

    skills = find_field("Select the skills you're looking for")
    skills.send_keys("twitt", :down, :return)
    skills.send_keys("face", :down, :return)
    find("button[aria-label='Four to ten']").click
    fill_in("budget", with: "10000")
    click_on("Continue")

    find("button[aria-label='Not Important']").click
    find("button[aria-label='Yes']").click
    find("button[aria-label='World-class']").click
    click_on("Continue")

    expect(page).to have_content("We think you might be a good fit")
  end
end
