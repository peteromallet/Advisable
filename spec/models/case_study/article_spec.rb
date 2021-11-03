# frozen_string_literal: true

require "rails_helper"

RSpec.describe CaseStudy::Article, type: :model do
  include_examples "uid"

  it "has a valid factory" do
    expect(build(:case_study_article)).to be_valid
  end
end
