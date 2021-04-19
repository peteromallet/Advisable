# frozen_string_literal: true

require "rails_helper"

RSpec.describe CaseStudy::Section, type: :model do
  it "has a valid factory" do
    expect(build(:case_study_section)).to be_valid
  end
end
