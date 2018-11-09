require 'rails_helper'

describe 'Update availability' do
  let(:user) { create(:user) }

  it 'sets the clients availability' do
    visit "/clients/#{user.airtable_id}/availability"

    page.all("div[class^=styles__TimeCell]")[10].click
    page.all("div[class^=styles__TimeCell]")[34].click
    page.all("div[class^=styles__TimeCell]")[58].click
    page.all("div[class^=styles__TimeCell]")[82].click
    page.all("div[class^=styles__TimeCell]")[94].click

    click_on "Update Availability"

    expect(page).to have_content("Your availability has been updated")
  end
end