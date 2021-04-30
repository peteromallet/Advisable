# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Consultations', type: :system do
  let(:specialist) { create(:specialist) }

  before do
    skill = create(:skill, name: "Testing")
    specialist.skills << skill
    allow_any_instance_of(User).to receive(:sync_to_airtable)
    allow_any_instance_of(Application).to receive(:sync_to_airtable)
    allow_any_instance_of(Consultation).to receive(:sync_to_airtable)
    allow_any_instance_of(Project).to receive(:sync_to_airtable)
    allow_any_instance_of(Interview).to receive(:sync_to_airtable)
  end

  it 'allows client to request a consultation with a freelancer' do
    visit "/request_consultation/#{specialist.uid}"
    find("*[aria-label='Testing']").click
    click_on "Continue"
    fill_in "firstName", with: "Michael"
    fill_in "lastName", with: "Scott"
    fill_in "email", with: "michael@dundermifflin.com"
    fill_in "company", with: "Dunder Mifflin"
    click_on "Continue"

    fill_in "password", with: "testing123"
    fill_in "passwordConfirmation", with: "testing123"
    click_on "Set Password"

    monday = Date.parse('monday')
    delta = monday > Time.zone.now ? 0 : 7
    next_monday = monday + delta
    find("[aria-label='#{next_monday.strftime('%-d %b %Y, 09:00')}']").click
    find("[aria-label='#{next_monday.strftime('%-d %b %Y, 09:30')}']").click
    find("[aria-label='#{next_monday.strftime('%-d %b %Y, 10:00')}']").click
    find("[aria-label='#{next_monday.strftime('%-d %b %Y, 10:30')}']").click
    find("[aria-label='#{next_monday.strftime('%-d %b %Y, 11:00')}']").click
    find("[aria-label='#{next_monday.strftime('%-d %b %Y, 11:30')}']").click
    click_on "Continue"

    fill_in "topic", with: "This is the topic"
    click_on "Continue"

    click_on "Likely"
    click_on "Request Consultation"

    expect(page).to have_content("We have sent your request")
  end

  context 'when a consultation request has been sent' do
    let(:consultation) { create(:consultation, specialist: specialist) }

    it 'allows the specialist to accept ' do
      authenticate_as(specialist)
      visit "/consultations/#{consultation.uid}"
      click_on "Accept Request"
      expect(page).to have_content("select an available day")
    end

    it 'allows the specialist to decline ' do
      authenticate_as(specialist)
      visit "/consultations/#{consultation.uid}"
      click_on "Decline Request"
      fill_in "reason", with: "No thanks"
      click_on "Decline Consultation"
      expect(page).to have_content("You have declined this consultation")
    end
  end
end
