# frozen_string_literal: true

require 'rails_helper'

RSpec.describe CaseStudy::Skill, type: :model do
  it "has a valid factory" do
    expect(build(:case_study_skill)).to be_valid
  end
end
