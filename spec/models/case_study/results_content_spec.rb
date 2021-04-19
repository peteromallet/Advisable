# frozen_string_literal: true

require "rails_helper"

RSpec.describe CaseStudy::ResultsContent, type: :model do
  let(:results) { build(:case_study_results_content) }

  it "has a valid factory" do
    expect(results).to be_valid
  end

  context "without results" do
    let(:results) { build(:case_study_results_content, content: {text: "Not valid 😔"}) }

    it "is invalid" do
      expect(results).not_to be_valid
    end
  end
end
