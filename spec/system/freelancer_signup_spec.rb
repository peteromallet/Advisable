# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Freelancer signup', type: :system do
  before do
    allow(Token).to receive(:new).and_return("testing123")
    allow_any_instance_of(Specialist).to receive(:sync_to_airtable)
    create(:country, name: "Ireland", alpha2: "IE")
    create(:industry, name: "Financial Services")
    create(:industry, name: "Development")
    create(:industry, name: "Design")
    create(:skill, name: "Linkedin Advertising")
    create(:skill, name: "Facebook Advertising")
    create(:skill, name: "Twitter Advertising")
  end

  it 'allows specialsit to signup' do
    visit '/freelancers/signup'

    industry = find_field("e.g Online Marketing")
    industry.send_keys("face", :down, :return)
    industry.send_keys("twi", :down, :return)
    click_on("Get Started")

    fill_in("firstName", with: "Dwight")
    fill_in("lastName", with: "Schrute")
    fill_in("phone", with: "0861234567")
    fill_in("email", with: "dwight@test.com")
    fill_in("password", with: "testing123")
    click_on("Continue")

    expect(page).to have_content("Confirm your account")

    visit "/freelancers/signup/confirm?email=dwight@test.com&t=testing123"

    choose("Yes, freelancing is my primary occupation", allow_label_click: true)
    find("label", text: "5-20").click
    fill_in("rate", with: "100")
    click_on("Continue")

    fill_in("bio", with: "hello")
    fill_in("city", with: "Dublin")
    select("Ireland", from: "country")
    click_on("Continue")

    fill_in("website", with: "https://google.com")
    click_on("Complete Setup")

    expect(page).to have_content("Your account is currently on hold")
  end
end
