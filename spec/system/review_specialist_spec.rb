# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Reviewing a specialist', type: :system do
  before do
    OmniAuth.config.test_mode = true
    OmniAuth.config.add_mock(
      :linkedin,
      {
        provider: 'linkedin',
        uid: '123545',
        info: {
          name: 'John Doe', first_name: 'John', last_name: 'Doe', image: nil
        }
      }
    )
  end

  let(:specialist) { create(:specialist) }

  it 'allows viewer to review a specialist' do
    visit "/review/#{specialist.uid}"
    click_on text: /login with/i
    find('label[aria-label="Rate Skills 5 stars"]').click
    find('label[aria-label="Rate Quality of work 5 stars"]').click
    find('label[aria-label="Rate Adherence to schedule 5 stars"]').click
    find('label[aria-label="Rate Communication 5 stars"]').click
    find('label[aria-label="Rate Availability 5 stars"]').click
    click_on 'Continue'
    fill_in("companyName", with: "Test Corp")
    select("I worked on the project with them", from: "relationship")
    fill_in('comment', with: 'Really great')
    click_on 'Submit Review'
    expect(page).to have_text(/thanks/i)
  end
end
