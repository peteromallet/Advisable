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

  context "with category" do
    let(:results) { build(:case_study_results_content, :with_category) }

    it "is valid" do
      expect(results).to be_valid
    end
  end

  describe "#to_text" do
    it "returns just the text of the results" do
      expect(results.to_text).to eq("Successful company rebranding and repositioning with full acceptance inside and out\nChanged strategy, methodology, mindset & vision to fit a SaaS company")
    end

    context "with category" do
      let(:results) { build(:case_study_results_content, :with_category) }

      it "returns the contexts of the results" do
        expect(results.to_text).to eq("Successful company rebranding and repositioning with full acceptance inside and out\nChanged strategy, methodology, mindset & vision to fit a SaaS company")
      end
    end
  end
end
