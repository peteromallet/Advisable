# frozen_string_literal: true

require "rails_helper"

RSpec.describe CaseStudy::FavoritedArticle, type: :model do
  let(:favorited_article) { create(:case_study_favorited_article) }

  it "has a valid factory" do
    expect(favorited_article).to be_valid
  end
end
