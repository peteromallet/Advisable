# frozen_string_literal: true

require "rails_helper"

RSpec.describe CaseStudy::PodcastContent, type: :model do
  let(:podcast) { build(:case_study_podcast_content) }

  it "has a valid factory" do
    expect(podcast).to be_valid
  end
end
