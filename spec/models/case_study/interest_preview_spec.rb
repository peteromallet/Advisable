# frozen_string_literal: true

require "rails_helper"

RSpec.describe CaseStudy::InterestPreview, type: :model do
  let(:interest_preview) { create(:case_study_interest_preview) }

  it "has a valid factory" do
    expect(interest_preview).to be_valid
  end
end
