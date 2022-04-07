# frozen_string_literal: true

require "rails_helper"

RSpec.describe CaseStudy::InterestArticle, type: :model do
  let(:interest_article) { create(:case_study_interest_article) }

  it "has a valid factory" do
    expect(interest_article).to be_valid
  end
end
