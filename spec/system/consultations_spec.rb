# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Consultations", type: :system do
  let(:specialist) { create(:specialist) }

  before do
    allow_any_instance_of(User).to receive(:sync_to_airtable)
    allow_any_instance_of(Project).to receive(:sync_to_airtable)
  end

  context "when a consultation request has been sent" do
    let(:consultation) { create(:consultation, specialist:) }

    it "allows the specialist to accept" do
      authenticate_as(specialist)
      visit "/consultations/#{consultation.uid}"
      click_on "Accept Request"
      expect(page).to have_content("select an available day")
    end

    it "allows the specialist to decline" do
      authenticate_as(specialist)
      visit "/consultations/#{consultation.uid}"
      click_on "Decline Request"
      fill_in "reason", with: "No thanks"
      click_on "Decline Consultation"
      expect(page).to have_content("You have declined this consultation")
    end
  end
end
