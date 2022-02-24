# frozen_string_literal: true

require "rails_helper"

RSpec.describe CaseStudy::Embedding, type: :model do
  let(:embedding) { build(:case_study_embedding) }

  it "has a valid factory" do
    expect(embedding).to be_valid
  end
end
