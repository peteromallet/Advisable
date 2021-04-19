# frozen_string_literal: true

require 'rails_helper'

RSpec.describe CaseStudy::ParagraphContent, type: :model do
  let(:paragraph) { build(:case_study_paragraph_content) }

  it "has a valid factory" do
    expect(paragraph).to be_valid
  end
end
