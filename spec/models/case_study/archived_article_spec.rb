# frozen_string_literal: true

require "rails_helper"

RSpec.describe CaseStudy::ArchivedArticle, type: :model do
  it "has a valid factory" do
    expect(build(:case_study_archived_article)).to be_valid
  end
end
