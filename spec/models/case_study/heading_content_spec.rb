# frozen_string_literal: true

require "rails_helper"

RSpec.describe CaseStudy::HeadingContent, type: :model do
  let(:heading) { build(:case_study_heading_content) }

  it "has a valid factory" do
    expect(heading).to be_valid
  end

  context "without size" do
    let(:heading) { build(:case_study_heading_content, content: {text: "Not valid 😔"}) }

    it "is invalid" do
      expect(heading).not_to be_valid
    end
  end
end
