# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Agreements", type: :system do
  let(:user) { create(:user, account: create(:account, :team_manager, first_name: "Michael", last_name: "Scott")) }
  let(:specialist) { create(:specialist, account: create(:account, first_name: "Dwight")) }
  let(:agreement) do
    create(:agreement, {
      user:,
      specialist:,
      company: user.company,
      collaboration: "fixed",
      invoicing: "after",
      status: "pending"
    })
  end

  let(:conversation) { create(:conversation) }

  before do
    conversation.participants.create!(account: user.account)
    conversation.participants.create!(account: specialist.account)
    conversation.new_message!(
      author: specialist.account,
      content: "Hey, I'm interested in working with you!",
      agreement:,
      kind: "AgreementCreated",
      send_emails: false
    )
  end

  it "allows freelancer can send an agreement" do
    authenticate_as(specialist)
    visit("/new_agreement/#{user.uid}")
    click_button("Get Started")
    choose("Hourly rate", allow_label_click: true)
    fill_in("hourlyRate", with: "75")
    click_button("Continue")
    choose("After completion of work", allow_label_click: true)
    click_button("Continue")
    fill_in("message", with: Faker::Lorem.paragraph)
    attach_file(
      "message-attachments",
      Rails.root.join("spec/support/01.jpg"),
      make_visible: true
    )
    click_button("Send request")
    expect(page).to have_content("Dwight requested to work together")
    expect(page).to have_content("01.jpg")
  end

  it "allows client to accept an agreement" do
    authenticate_as(user)
    visit("/messages/#{conversation.uid}")
    click_button("Respond")
    click_button("Accept")
    expect(page).to have_content("Michael Scott accepted Dwight’s request to work together")
  end

  it "allows client to decline an agreement" do
    authenticate_as(user)
    visit("/messages/#{conversation.uid}")
    click_button("Respond")
    click_button("Decline")
    within("*[role='dialog']") do
      fill_in("message", with: "Not interested")
      click_on("Decline Request")
    end
    expect(page).to have_content("Michael Scott declined Dwight’s request to work together")
  end

  context "when client hasn't setup payments" do
    it "asks them for invoice details first" do
      allow(Stripe::Customer).to receive(:update)
      allow(Stripe::Customer).to receive(:create_tax_id)
      create(:country, name: "Italy", alpha2: "IT", eu: true)
      authenticate_as(user)
      user.company.update(payments_setup: false)
      visit("/messages/#{conversation.uid}")
      click_button("Respond")
      click_button("Accept")
      fill_in("name", with: "Michael Scott")
      fill_in("companyName", with: "Dunder Mifflin")
      fill_in("billingEmail", with: "kevin@dundermifflin.com")
      fill_in("address.line1", with: "Duner Mifflin")
      fill_in("address.city", with: "Scranton")
      fill_in("address.state", with: "Pennsylvania")
      select("Italy", from: "address.country")
      fill_in("vatNumber", with: "IT123456789")
      click_on("Save & Accept")
      expect(page).to have_content("Michael Scott accepted Dwight’s request to work together")
    end
  end
end
