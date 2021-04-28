# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Guild view post", type: :system do
  let(:account) { create(:account, completed_tutorials: ["guild"]) }
  let(:specialist) { create(:specialist, guild: true, account: account) }

  context "with recommendations" do
    before do
      authenticate_as(specialist)
    end

    it "has a recommendation" do
      stub_const("Recommendation::RECOMMENDERS", [Recommendation::Random])
      match = create(:specialist, guild: true)

      visit("/guild/feed")
      expect(page).to have_content("SUGGESTED MEMBER")
      expect(page).to have_content("#{match.first_name} is an expert in Marketing")
    end
  end
end
