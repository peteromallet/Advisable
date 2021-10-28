# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Opportunity page", type: :system do
  let(:project) { create(:project, brief_confirmed_at: 1.week.ago) }
  let(:specialist) { create(:specialist) }

  before do
    allow_any_instance_of(Application).to receive(:sync_to_airtable)
  end

  it "allows a freelancer to apply for a project" do
    authenticate_as(specialist)
    visit "/opportunities/#{project.uid}"
    click_on "Apply"
    expect(page).to have_content("Give a 2-3 line description of your background as it related to this project.")
  end
end
