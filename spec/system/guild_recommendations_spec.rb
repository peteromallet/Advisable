# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Guild view post", type: :system do
  let(:account) { create(:account, completed_tutorials: ["guild"]) }
  let(:specialist) { create(:specialist, guild: true, account: account) }

  context "with recomendations" do
    before do
      create(:specialist, guild: true)
      authenticate_as(specialist)
    end

    it "is has a recommendation when enabled" do
      stub_const("Specialists::Recommender::RECOMMENDERS", [Specialists::Recommenders::RandomRecommendation])
      account.toggle_guild_recommendations!

      visit("/guild/feed")
      expect(page).to have_content("SUGGESTED MEMBER")
    end

    it "does not have a recommendation when disabled" do
      visit("/guild/feed")
      expect(page).not_to have_content("SUGGESTED MEMBER")
    end
  end
end
