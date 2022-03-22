# frozen_string_literal: true

require "rails_helper"

RSpec.describe CaseStudy::Interest, type: :model do
  let(:interest) { create(:case_study_interest) }

  it "has a valid factory" do
    expect(build(:case_study_interest)).to be_valid
  end
end
