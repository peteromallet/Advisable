# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Freelancer dashboard', type: :system do
  let(:application_stage) { "Accepted" }
  let(:specialist) { create(:specialist, application_stage: application_stage) }

  context "when application_stage is 'Started'" do
    let(:application_stage) { "Started" }

    it 'prompts user to start their application to advisable' do
      authenticate_as(specialist)
      visit("/")
      expect(page).to have_content("Account Created")
      click_on("Continue Application")
      expect(page).to have_content("Welcome to Advisable")
    end
  end

  context "when application_stage is 'Submitted'" do
    let(:application_stage) { "Submitted" }

    it 'informs user we are reviewing their application' do
      authenticate_as(specialist)
      visit("/")
      expect(page).to have_content("We are reviewing your application")
    end
  end

  context "when application_stage is 'Invited To Interview'" do
    let(:application_stage) { "Invited To Interview" }

    it 'prompts the user to schedule an interview' do
      authenticate_as(specialist)
      visit("/")
      expect(page).to have_content("Schedule Interview")
    end
  end
end
