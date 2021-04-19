# frozen_string_literal: true

require 'rails_helper'

RSpec.describe CaseStudy::ImagesContent, type: :model do
  let(:images) { build(:case_study_images_content) }

  it "has a valid factory" do
    expect(images).to be_valid
  end

  context "with content" do
    let(:images) { build(:case_study_images_content, content: {text: "Not valid 😔"}) }

    it "is invalid" do
      expect(images).not_to be_valid
    end
  end
end
