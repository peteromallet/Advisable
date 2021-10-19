# frozen_string_literal: true

require 'rails_helper'

RSpec.describe "Reviewing a case study", type: :system do
  before do
    OmniAuth.config.test_mode = true
    OmniAuth.config.add_mock(
      :linkedin,
      {
        provider: "linkedin",
        uid: "12345",
        info: {
          name: "John Doe", first_name: "John", last_name: "Doe", image: nil
        }
      }
    )
  end

  let(:specialist) { create(:specialist) }
  let(:article) { create(:case_study_article) }

  it "allows viewer to review a case study" do
    visit "/review/#{specialist.uid}/case_studies/#{article.uid}"
    click_on text: /login with/i
    find('label[aria-label="Rate Skills 5 stars"]').click
    find('label[aria-label="Rate Quality of work 5 stars"]').click
    find('label[aria-label="Rate Adherence to schedule 5 stars"]').click
    find('label[aria-label="Rate Communication 5 stars"]').click
    find('label[aria-label="Rate Availability 5 stars"]').click
    click_on 'Continue'
    fill_in('comment', with: 'Really great')
    click_on 'Submit Review'
    expect(page).to have_text(/thanks/i)
  end

  it "allows viewer to skip ratings step" do
    visit "/review/#{specialist.uid}/case_studies/#{article.uid}"
    click_on text: /login with/i
    click_on 'Skip'
    fill_in('comment', with: 'Really great')
    click_on 'Submit Review'
    expect(page).to have_text(/thanks/i)
  end

  context "when review already exists" do
    it "display that case study has already been reviewed" do
      article.create_review
      visit "/review/#{specialist.uid}/case_studies/#{article.uid}"
      expect(page).to have_text(/already been reviewed/i)
    end
  end
end
