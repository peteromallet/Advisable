# frozen_string_literal: true

require "rails_helper"

RSpec.describe SkillSimilarity, type: :model do
  it "has a valid factory" do
    expect(build(:skill_similarity)).to be_valid
  end
end
