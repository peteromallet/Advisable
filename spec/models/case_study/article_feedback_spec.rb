# frozen_string_literal: true

require 'rails_helper'

RSpec.describe CaseStudy::ArticleFeedback, type: :model do
  it "has a valid factory" do
    expect(build(:case_study_article_feedback)).to be_valid
  end
end
